package com.vhstudio.formsapi.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vhstudio.formsapi.models.Form;
import com.vhstudio.formsapi.models.FormResponse;
import com.vhstudio.formsapi.models.Question;
import com.vhstudio.formsapi.models.QuestionAnswer;
import com.vhstudio.formsapi.models.QuestionOption;
import com.vhstudio.formsapi.repositories.FormRepository;
import com.vhstudio.formsapi.repositories.FormResponseRepository;
import com.vhstudio.formsapi.repositories.QuestionAnswerRepository;
import com.vhstudio.formsapi.repositories.QuestionOptionRepository;
import com.vhstudio.formsapi.repositories.QuestionRepository;
import com.vhstudio.formsapi.utils.dtos.CreateFormResponseRequest;
import com.vhstudio.formsapi.utils.dtos.CreateFormResponseResponse;
import com.vhstudio.formsapi.utils.dtos.SubmitFormResponseRequest;
import com.vhstudio.formsapi.utils.dtos.SubmitQuestionAnswerRequest;
import com.vhstudio.formsapi.utils.enums.QuestionType;
import com.vhstudio.formsapi.utils.enums.ResponseStatus;
import com.vhstudio.formsapi.utils.exceptions.BadRequestException;
import com.vhstudio.formsapi.utils.exceptions.ResourceNotFoundException;
import com.vhstudio.formsapi.utils.exceptions.UnauthorizedException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PublicResponseService {
    private final FormRepository formRepository;
    private final FormResponseRepository formResponseRepository;
    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final QuestionAnswerRepository questionAnswerRepository;
    private final ObjectMapper objectMapper;
    private final SecureRandom secureRandom = new SecureRandom();

    public PublicResponseService(
        FormRepository formRepository,
        FormResponseRepository formResponseRepository,
        QuestionRepository questionRepository,
        QuestionOptionRepository questionOptionRepository,
        QuestionAnswerRepository questionAnswerRepository,
        ObjectMapper objectMapper
    ) {
        this.formRepository = formRepository;
        this.formResponseRepository = formResponseRepository;
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.questionAnswerRepository = questionAnswerRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public CreateFormResponseResponse createFormResponse(String publicSlug, CreateFormResponseRequest request) {
        Form form = formRepository.findByPublicSlug(publicSlug)
            .orElseThrow(() -> new ResourceNotFoundException("Public form not found"));
        if (!Boolean.TRUE.equals(form.getPublished())) {
            throw new ResourceNotFoundException("Public form not found");
        }

        FormResponse response = new FormResponse();
        response.setForm(form);
        if (request != null) {
            response.setRespondentName(request.respondentName());
            response.setRespondentEmail(request.respondentEmail());
        }
        response.setStatus(ResponseStatus.ONGOING);
        response.setStartedAt(LocalDateTime.now());
        response.setAccessToken(generateAccessToken());
        FormResponse savedResponse = formResponseRepository.save(response);
        return new CreateFormResponseResponse(savedResponse.getId(), savedResponse.getAccessToken());
    }

    @Transactional
    public void submitFormResponse(UUID responseId, SubmitFormResponseRequest request) {
        FormResponse response = formResponseRepository.findById(responseId)
            .orElseThrow(() -> new ResourceNotFoundException("Form response not found"));
        if (!response.getAccessToken().equals(request.accessToken())) {
            throw new UnauthorizedException("Invalid response access token");
        }
        if (response.getStatus() == ResponseStatus.FINISHED) {
            throw new BadRequestException("Form response is already finished");
        }
        if (!Boolean.TRUE.equals(response.getForm().getPublished())) {
            throw new BadRequestException("Form is not published");
        }

        List<Question> formQuestions = questionRepository.findBySectionFormId(response.getForm().getId());
        Map<UUID, Question> questionById = new HashMap<>();
        formQuestions.forEach(question -> questionById.put(question.getId(), question));

        Map<UUID, SubmitQuestionAnswerRequest> answerByQuestionId = validateSubmittedQuestionIds(request.answers(), questionById);
        validateRequiredQuestions(formQuestions, answerByQuestionId);
        validateQuestionOptions(answerByQuestionId, questionById);

        for (SubmitQuestionAnswerRequest answerRequest : answerByQuestionId.values()) {
            QuestionAnswer answer = new QuestionAnswer();
            answer.setFormResponse(response);
            answer.setQuestion(questionById.get(answerRequest.questionId()));
            answer.setValue(answerRequest.value());
            questionAnswerRepository.save(answer);
        }

        response.setStatus(ResponseStatus.FINISHED);
        response.setFinishedAt(LocalDateTime.now());
        formResponseRepository.save(response);
    }

    public String generateAccessToken() {
        String token;
        do {
            byte[] randomBytes = new byte[24];
            secureRandom.nextBytes(randomBytes);
            token = HexFormat.of().formatHex(randomBytes);
        } while (formResponseRepository.existsByAccessToken(token));
        return token;
    }

    private Map<UUID, SubmitQuestionAnswerRequest> validateSubmittedQuestionIds(
        List<SubmitQuestionAnswerRequest> answers,
        Map<UUID, Question> questionById
    ) {
        Map<UUID, SubmitQuestionAnswerRequest> answerByQuestionId = new HashMap<>();
        Set<UUID> seenQuestionIds = new HashSet<>();
        for (SubmitQuestionAnswerRequest answer : answers) {
            if (!questionById.containsKey(answer.questionId())) {
                throw new BadRequestException("Question does not belong to this form");
            }
            if (!seenQuestionIds.add(answer.questionId())) {
                throw new BadRequestException("Duplicate answer for question");
            }
            answerByQuestionId.put(answer.questionId(), answer);
        }
        return answerByQuestionId;
    }

    public void validateRequiredQuestions(
        List<Question> questions,
        Map<UUID, SubmitQuestionAnswerRequest> answerByQuestionId
    ) {
        for (Question question : questions) {
            if (Boolean.TRUE.equals(question.getRequired())) {
                SubmitQuestionAnswerRequest answer = answerByQuestionId.get(question.getId());
                if (answer == null || answer.value() == null || answer.value().isBlank()) {
                    throw new BadRequestException("Required question was not answered: " + question.getTitle());
                }
                if (question.getType() == QuestionType.CHECKBOX && parseCheckboxValues(answer.value()).isEmpty()) {
                    throw new BadRequestException("Required checkbox question was not answered: " + question.getTitle());
                }
            }
        }
    }

    public void validateQuestionOptions(
        Map<UUID, SubmitQuestionAnswerRequest> answerByQuestionId,
        Map<UUID, Question> questionById
    ) {
        for (SubmitQuestionAnswerRequest answer : answerByQuestionId.values()) {
            Question question = questionById.get(answer.questionId());
            if (answer.value() == null || answer.value().isBlank() || question.getType() == QuestionType.TEXTAREA) {
                continue;
            }

            Set<String> allowedValues = questionOptionRepository.findByQuestionIdOrderByPositionAsc(question.getId()).stream()
                .map(QuestionOption::getValue)
                .collect(java.util.stream.Collectors.toSet());

            if (question.getType() == QuestionType.SELECTION && !allowedValues.contains(answer.value())) {
                throw new BadRequestException("Invalid option for question: " + question.getTitle());
            }

            if (question.getType() == QuestionType.CHECKBOX) {
                List<String> selectedValues = parseCheckboxValues(answer.value());
                if (!allowedValues.containsAll(selectedValues)) {
                    throw new BadRequestException("Invalid checkbox option for question: " + question.getTitle());
                }
            }
        }
    }

    private List<String> parseCheckboxValues(String value) {
        try {
            return objectMapper.readValue(value, new TypeReference<>() {});
        } catch (JsonProcessingException exception) {
            throw new BadRequestException("CHECKBOX answers must be a JSON string array");
        }
    }
}

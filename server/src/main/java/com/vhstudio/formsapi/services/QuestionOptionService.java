package com.vhstudio.formsapi.services;

import com.vhstudio.formsapi.models.Question;
import com.vhstudio.formsapi.models.QuestionOption;
import com.vhstudio.formsapi.repositories.QuestionOptionRepository;
import com.vhstudio.formsapi.utils.dtos.CreateQuestionOptionRequest;
import com.vhstudio.formsapi.utils.dtos.QuestionOptionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.UpdateQuestionOptionRequest;
import com.vhstudio.formsapi.utils.enums.QuestionType;
import com.vhstudio.formsapi.utils.exceptions.BadRequestException;
import com.vhstudio.formsapi.utils.exceptions.ForbiddenException;
import com.vhstudio.formsapi.utils.exceptions.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionOptionService {
    private final QuestionOptionRepository questionOptionRepository;
    private final QuestionService questionService;
    private final AuthService authService;
    private final DtoMapper dtoMapper;

    public QuestionOptionService(
        QuestionOptionRepository questionOptionRepository,
        QuestionService questionService,
        AuthService authService,
        DtoMapper dtoMapper
    ) {
        this.questionOptionRepository = questionOptionRepository;
        this.questionService = questionService;
        this.authService = authService;
        this.dtoMapper = dtoMapper;
    }

    @Transactional
    public QuestionOptionResponseDTO createOption(UUID questionId, CreateQuestionOptionRequest request) {
        Question question = questionService.getOwnedQuestion(questionId);
        validateQuestionAcceptsOptions(question);
        QuestionOption option = new QuestionOption();
        option.setQuestion(question);
        option.setLabel(request.label());
        option.setValue(request.value());
        option.setPosition(request.position());
        return dtoMapper.toQuestionOptionResponseDTO(questionOptionRepository.save(option));
    }

    @Transactional
    public QuestionOptionResponseDTO updateOption(UUID optionId, UpdateQuestionOptionRequest request) {
        QuestionOption option = getOwnedOption(optionId);
        validateQuestionAcceptsOptions(option.getQuestion());
        option.setLabel(request.label());
        option.setValue(request.value());
        option.setPosition(request.position());
        return dtoMapper.toQuestionOptionResponseDTO(questionOptionRepository.save(option));
    }

    @Transactional
    public void deleteOption(UUID optionId) {
        QuestionOption option = getOwnedOption(optionId);
        questionOptionRepository.delete(option);
    }

    @Transactional(readOnly = true)
    public List<QuestionOptionResponseDTO> getOptionsByQuestion(UUID questionId) {
        Question question = questionService.getOwnedQuestion(questionId);
        validateQuestionAcceptsOptions(question);
        return questionOptionRepository.findByQuestionIdOrderByPositionAsc(questionId).stream()
            .map(dtoMapper::toQuestionOptionResponseDTO)
            .toList();
    }

    private QuestionOption getOwnedOption(UUID optionId) {
        QuestionOption option = questionOptionRepository.findById(optionId)
            .orElseThrow(() -> new ResourceNotFoundException("Question option not found"));
        if (!option.getQuestion().getSection().getForm().getOwner().getId().equals(authService.getCurrentUser().getId())) {
            throw new ForbiddenException("You do not have access to this question option");
        }
        return option;
    }

    private void validateQuestionAcceptsOptions(Question question) {
        if (question.getType() == QuestionType.TEXTAREA) {
            throw new BadRequestException("TEXTAREA questions cannot have options");
        }
    }
}

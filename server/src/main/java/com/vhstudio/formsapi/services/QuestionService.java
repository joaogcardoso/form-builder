package com.vhstudio.formsapi.services;

import com.vhstudio.formsapi.models.Question;
import com.vhstudio.formsapi.models.Section;
import com.vhstudio.formsapi.repositories.QuestionAnswerRepository;
import com.vhstudio.formsapi.repositories.QuestionOptionRepository;
import com.vhstudio.formsapi.repositories.QuestionRepository;
import com.vhstudio.formsapi.repositories.SectionRepository;
import com.vhstudio.formsapi.utils.dtos.CreateQuestionRequest;
import com.vhstudio.formsapi.utils.dtos.QuestionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.UpdateQuestionRequest;
import com.vhstudio.formsapi.utils.enums.QuestionType;
import com.vhstudio.formsapi.utils.exceptions.ForbiddenException;
import com.vhstudio.formsapi.utils.exceptions.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final SectionRepository sectionRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final QuestionAnswerRepository questionAnswerRepository;
    private final AuthService authService;
    private final DtoMapper dtoMapper;

    public QuestionService(
        QuestionRepository questionRepository,
        SectionRepository sectionRepository,
        QuestionOptionRepository questionOptionRepository,
        QuestionAnswerRepository questionAnswerRepository,
        AuthService authService,
        DtoMapper dtoMapper
    ) {
        this.questionRepository = questionRepository;
        this.sectionRepository = sectionRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.questionAnswerRepository = questionAnswerRepository;
        this.authService = authService;
        this.dtoMapper = dtoMapper;
    }

    @Transactional
    public QuestionResponseDTO createQuestion(UUID sectionId, CreateQuestionRequest request) {
        Section section = getOwnedSection(sectionId);
        Question question = new Question();
        question.setSection(section);
        question.setTitle(request.title());
        question.setDescription(request.description());
        question.setType(request.type());
        question.setRequired(request.required());
        question.setPosition(request.position());
        return dtoMapper.toQuestionResponseDTO(questionRepository.save(question));
    }

    @Transactional
    public QuestionResponseDTO updateQuestion(UUID questionId, UpdateQuestionRequest request) {
        Question question = getOwnedQuestion(questionId);
        question.setTitle(request.title());
        question.setDescription(request.description());
        question.setType(request.type());
        question.setRequired(request.required());
        question.setPosition(request.position());
        if (request.type() == QuestionType.TEXTAREA) {
            questionOptionRepository.findByQuestionIdOrderByPositionAsc(question.getId()).forEach(questionOptionRepository::delete);
        }
        return dtoMapper.toQuestionResponseDTO(questionRepository.save(question));
    }

    @Transactional
    public void deleteQuestion(UUID questionId) {
        Question question = getOwnedQuestion(questionId);
        questionOptionRepository.findByQuestionIdOrderByPositionAsc(question.getId()).forEach(questionOptionRepository::delete);
        questionAnswerRepository.findByQuestionId(question.getId()).forEach(questionAnswerRepository::delete);
        questionRepository.delete(question);
    }

    @Transactional(readOnly = true)
    public List<QuestionResponseDTO> getQuestionsBySection(UUID sectionId) {
        getOwnedSection(sectionId);
        return questionRepository.findBySectionIdOrderByPositionAsc(sectionId).stream()
            .map(dtoMapper::toQuestionResponseDTO)
            .toList();
    }

    public Question getOwnedQuestion(UUID questionId) {
        Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        if (!question.getSection().getForm().getOwner().getId().equals(authService.getCurrentUser().getId())) {
            throw new ForbiddenException("You do not have access to this question");
        }
        return question;
    }

    private Section getOwnedSection(UUID sectionId) {
        Section section = sectionRepository.findById(sectionId)
            .orElseThrow(() -> new ResourceNotFoundException("Section not found"));
        if (!section.getForm().getOwner().getId().equals(authService.getCurrentUser().getId())) {
            throw new ForbiddenException("You do not have access to this section");
        }
        return section;
    }
}

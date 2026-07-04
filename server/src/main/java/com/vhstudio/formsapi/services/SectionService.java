package com.vhstudio.formsapi.services;

import com.vhstudio.formsapi.models.Form;
import com.vhstudio.formsapi.models.Section;
import com.vhstudio.formsapi.repositories.QuestionAnswerRepository;
import com.vhstudio.formsapi.repositories.QuestionOptionRepository;
import com.vhstudio.formsapi.repositories.QuestionRepository;
import com.vhstudio.formsapi.repositories.SectionRepository;
import com.vhstudio.formsapi.utils.dtos.CreateSectionRequest;
import com.vhstudio.formsapi.utils.dtos.SectionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.UpdateSectionRequest;
import com.vhstudio.formsapi.utils.exceptions.ForbiddenException;
import com.vhstudio.formsapi.utils.exceptions.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;
    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final QuestionAnswerRepository questionAnswerRepository;
    private final FormService formService;
    private final AuthService authService;
    private final DtoMapper dtoMapper;

    public SectionService(
        SectionRepository sectionRepository,
        QuestionRepository questionRepository,
        QuestionOptionRepository questionOptionRepository,
        QuestionAnswerRepository questionAnswerRepository,
        FormService formService,
        AuthService authService,
        DtoMapper dtoMapper
    ) {
        this.sectionRepository = sectionRepository;
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.questionAnswerRepository = questionAnswerRepository;
        this.formService = formService;
        this.authService = authService;
        this.dtoMapper = dtoMapper;
    }

    @Transactional
    public SectionResponseDTO createSection(UUID formId, CreateSectionRequest request) {
        Form form = formService.getOwnedForm(formId);
        Section section = new Section();
        section.setForm(form);
        section.setTitle(request.title());
        section.setDescription(request.description());
        section.setPosition(request.position());
        return dtoMapper.toSectionResponseDTO(sectionRepository.save(section));
    }

    @Transactional
    public SectionResponseDTO updateSection(UUID sectionId, UpdateSectionRequest request) {
        Section section = getOwnedSection(sectionId);
        section.setTitle(request.title());
        section.setDescription(request.description());
        section.setPosition(request.position());
        return dtoMapper.toSectionResponseDTO(sectionRepository.save(section));
    }

    @Transactional
    public void deleteSection(UUID sectionId) {
        Section section = getOwnedSection(sectionId);
        questionRepository.findBySectionIdOrderByPositionAsc(section.getId()).forEach(question -> {
            questionOptionRepository.findByQuestionIdOrderByPositionAsc(question.getId()).forEach(questionOptionRepository::delete);
            questionAnswerRepository.findByQuestionId(question.getId()).forEach(questionAnswerRepository::delete);
            questionRepository.delete(question);
        });
        sectionRepository.delete(section);
    }

    @Transactional(readOnly = true)
    public List<SectionResponseDTO> getSectionsByForm(UUID formId) {
        formService.getOwnedForm(formId);
        return sectionRepository.findByFormIdOrderByPositionAsc(formId).stream()
            .map(dtoMapper::toSectionResponseDTO)
            .toList();
    }

    public Section getOwnedSection(UUID sectionId) {
        Section section = sectionRepository.findById(sectionId)
            .orElseThrow(() -> new ResourceNotFoundException("Section not found"));
        if (!section.getForm().getOwner().getId().equals(authService.getCurrentUser().getId())) {
            throw new ForbiddenException("You do not have access to this section");
        }
        return section;
    }
}

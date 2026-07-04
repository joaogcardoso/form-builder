package com.vhstudio.formsapi.services;

import com.vhstudio.formsapi.models.Form;
import com.vhstudio.formsapi.models.FormResponse;
import com.vhstudio.formsapi.models.Question;
import com.vhstudio.formsapi.models.QuestionAnswer;
import com.vhstudio.formsapi.models.QuestionOption;
import com.vhstudio.formsapi.models.Section;
import com.vhstudio.formsapi.repositories.QuestionOptionRepository;
import com.vhstudio.formsapi.repositories.QuestionRepository;
import com.vhstudio.formsapi.repositories.SectionRepository;
import com.vhstudio.formsapi.utils.dtos.FormDetailsResponse;
import com.vhstudio.formsapi.utils.dtos.FormResponseDTO;
import com.vhstudio.formsapi.utils.dtos.OwnerFormResponseDTO;
import com.vhstudio.formsapi.utils.dtos.OwnerQuestionAnswerDTO;
import com.vhstudio.formsapi.utils.dtos.PublicFormResponse;
import com.vhstudio.formsapi.utils.dtos.PublicQuestionOptionResponse;
import com.vhstudio.formsapi.utils.dtos.PublicQuestionResponse;
import com.vhstudio.formsapi.utils.dtos.PublicSectionResponse;
import com.vhstudio.formsapi.utils.dtos.QuestionOptionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.QuestionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.SectionResponseDTO;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {
    private final SectionRepository sectionRepository;
    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository questionOptionRepository;

    public DtoMapper(
        SectionRepository sectionRepository,
        QuestionRepository questionRepository,
        QuestionOptionRepository questionOptionRepository
    ) {
        this.sectionRepository = sectionRepository;
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
    }

    public FormResponseDTO toFormResponseDTO(Form form) {
        return new FormResponseDTO(
            form.getId(),
            form.getTitle(),
            form.getDescription(),
            form.getPublished(),
            form.getPublicSlug(),
            form.getCreatedAt(),
            form.getUpdatedAt()
        );
    }

    public FormDetailsResponse toFormDetailsResponse(Form form) {
        List<SectionResponseDTO> sections = sectionRepository.findByFormIdOrderByPositionAsc(form.getId()).stream()
            .map(this::toSectionResponseDTO)
            .toList();
        return new FormDetailsResponse(
            form.getId(),
            form.getTitle(),
            form.getDescription(),
            form.getPublished(),
            form.getPublicSlug(),
            form.getCreatedAt(),
            form.getUpdatedAt(),
            sections
        );
    }

    public SectionResponseDTO toSectionResponseDTO(Section section) {
        List<QuestionResponseDTO> questions = questionRepository.findBySectionIdOrderByPositionAsc(section.getId()).stream()
            .map(this::toQuestionResponseDTO)
            .toList();
        return new SectionResponseDTO(
            section.getId(),
            section.getForm().getId(),
            section.getTitle(),
            section.getDescription(),
            section.getPosition(),
            questions
        );
    }

    public QuestionResponseDTO toQuestionResponseDTO(Question question) {
        List<QuestionOptionResponseDTO> options = questionOptionRepository.findByQuestionIdOrderByPositionAsc(question.getId()).stream()
            .map(this::toQuestionOptionResponseDTO)
            .toList();
        return new QuestionResponseDTO(
            question.getId(),
            question.getSection().getId(),
            question.getTitle(),
            question.getDescription(),
            question.getType(),
            question.getRequired(),
            question.getPosition(),
            options
        );
    }

    public QuestionOptionResponseDTO toQuestionOptionResponseDTO(QuestionOption option) {
        return new QuestionOptionResponseDTO(
            option.getId(),
            option.getQuestion().getId(),
            option.getLabel(),
            option.getValue(),
            option.getPosition()
        );
    }

    public PublicFormResponse toPublicFormResponse(Form form) {
        List<PublicSectionResponse> sections = sectionRepository.findByFormIdOrderByPositionAsc(form.getId()).stream()
            .map(this::toPublicSectionResponse)
            .toList();
        return new PublicFormResponse(form.getId(), form.getTitle(), form.getDescription(), form.getPublicSlug(), sections);
    }

    private PublicSectionResponse toPublicSectionResponse(Section section) {
        List<PublicQuestionResponse> questions = questionRepository.findBySectionIdOrderByPositionAsc(section.getId()).stream()
            .map(this::toPublicQuestionResponse)
            .toList();
        return new PublicSectionResponse(
            section.getId(),
            section.getTitle(),
            section.getDescription(),
            section.getPosition(),
            questions
        );
    }

    private PublicQuestionResponse toPublicQuestionResponse(Question question) {
        List<PublicQuestionOptionResponse> options = questionOptionRepository.findByQuestionIdOrderByPositionAsc(question.getId()).stream()
            .map(option -> new PublicQuestionOptionResponse(
                option.getId(),
                option.getLabel(),
                option.getValue(),
                option.getPosition()
            ))
            .toList();
        return new PublicQuestionResponse(
            question.getId(),
            question.getTitle(),
            question.getDescription(),
            question.getType(),
            question.getRequired(),
            question.getPosition(),
            options
        );
    }

    public OwnerFormResponseDTO toOwnerFormResponseDTO(FormResponse response, List<QuestionAnswer> answers) {
        List<OwnerQuestionAnswerDTO> answerDtos = answers.stream()
            .map(answer -> new OwnerQuestionAnswerDTO(
                answer.getId(),
                answer.getQuestion().getId(),
                answer.getQuestion().getTitle(),
                answer.getValue(),
                answer.getCreatedAt()
            ))
            .toList();
        return new OwnerFormResponseDTO(
            response.getId(),
            response.getForm().getId(),
            response.getRespondentName(),
            response.getRespondentEmail(),
            response.getStatus(),
            response.getCreatedAt(),
            response.getStartedAt(),
            response.getFinishedAt(),
            answerDtos
        );
    }
}

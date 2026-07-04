package com.vhstudio.formsapi.services;

import com.vhstudio.formsapi.models.Form;
import com.vhstudio.formsapi.models.FormResponse;
import com.vhstudio.formsapi.repositories.FormResponseRepository;
import com.vhstudio.formsapi.repositories.QuestionAnswerRepository;
import com.vhstudio.formsapi.utils.dtos.OwnerFormResponseDTO;
import com.vhstudio.formsapi.utils.exceptions.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OwnerResponseService {
    private final FormResponseRepository formResponseRepository;
    private final QuestionAnswerRepository questionAnswerRepository;
    private final FormService formService;
    private final DtoMapper dtoMapper;

    public OwnerResponseService(
        FormResponseRepository formResponseRepository,
        QuestionAnswerRepository questionAnswerRepository,
        FormService formService,
        DtoMapper dtoMapper
    ) {
        this.formResponseRepository = formResponseRepository;
        this.questionAnswerRepository = questionAnswerRepository;
        this.formService = formService;
        this.dtoMapper = dtoMapper;
    }

    @Transactional(readOnly = true)
    public List<OwnerFormResponseDTO> listFormResponses(UUID formId) {
        Form form = formService.getOwnedForm(formId);
        return formResponseRepository.findByFormId(form.getId()).stream()
            .map(response -> dtoMapper.toOwnerFormResponseDTO(
                response,
                questionAnswerRepository.findByFormResponseId(response.getId())
            ))
            .toList();
    }

    @Transactional(readOnly = true)
    public OwnerFormResponseDTO getFormResponseDetails(UUID formId, UUID responseId) {
        Form form = formService.getOwnedForm(formId);
        FormResponse response = formResponseRepository.findById(responseId)
            .orElseThrow(() -> new ResourceNotFoundException("Form response not found"));
        if (!response.getForm().getId().equals(form.getId())) {
            throw new ResourceNotFoundException("Form response not found");
        }
        return dtoMapper.toOwnerFormResponseDTO(response, questionAnswerRepository.findByFormResponseId(response.getId()));
    }
}

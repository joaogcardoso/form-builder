package com.vhstudio.formsapi.utils.dtos;

import com.vhstudio.formsapi.utils.enums.ResponseStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OwnerFormResponseDTO(
    UUID id,
    UUID formId,
    String respondentName,
    String respondentEmail,
    ResponseStatus status,
    LocalDateTime createdAt,
    LocalDateTime startedAt,
    LocalDateTime finishedAt,
    List<OwnerQuestionAnswerDTO> answers
) {}

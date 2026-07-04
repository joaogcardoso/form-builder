package com.vhstudio.formsapi.utils.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record OwnerQuestionAnswerDTO(
    UUID id,
    UUID questionId,
    String questionTitle,
    String value,
    LocalDateTime createdAt
) {}

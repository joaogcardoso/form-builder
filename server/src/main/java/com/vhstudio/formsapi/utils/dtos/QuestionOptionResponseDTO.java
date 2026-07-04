package com.vhstudio.formsapi.utils.dtos;

import java.util.UUID;

public record QuestionOptionResponseDTO(
    UUID id,
    UUID questionId,
    String label,
    String value,
    Integer position
) {}

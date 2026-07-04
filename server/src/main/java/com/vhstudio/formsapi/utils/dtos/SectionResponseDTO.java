package com.vhstudio.formsapi.utils.dtos;

import java.util.List;
import java.util.UUID;

public record SectionResponseDTO(
    UUID id,
    UUID formId,
    String title,
    String description,
    Integer position,
    List<QuestionResponseDTO> questions
) {}

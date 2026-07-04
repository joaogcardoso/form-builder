package com.vhstudio.formsapi.utils.dtos;

import com.vhstudio.formsapi.utils.enums.QuestionType;
import java.util.List;
import java.util.UUID;

public record QuestionResponseDTO(
    UUID id,
    UUID sectionId,
    String title,
    String description,
    QuestionType type,
    Boolean required,
    Integer position,
    List<QuestionOptionResponseDTO> options
) {}

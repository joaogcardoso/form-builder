package com.vhstudio.formsapi.utils.dtos;

import com.vhstudio.formsapi.utils.enums.QuestionType;
import java.util.List;
import java.util.UUID;

public record PublicQuestionResponse(
    UUID id,
    String title,
    String description,
    QuestionType type,
    Boolean required,
    Integer position,
    List<PublicQuestionOptionResponse> options
) {}

package com.vhstudio.formsapi.utils.dtos;

import com.vhstudio.formsapi.utils.enums.QuestionType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateQuestionRequest(
    @NotBlank String title,
    String description,
    @NotNull QuestionType type,
    @NotNull Boolean required,
    @NotNull @Min(1) Integer position
) {}

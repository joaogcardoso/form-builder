package com.vhstudio.formsapi.utils.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateQuestionOptionRequest(
    @NotBlank String label,
    @NotBlank String value,
    @NotNull @Min(1) Integer position
) {}

package com.vhstudio.formsapi.utils.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateSectionRequest(
    @NotBlank String title,
    String description,
    @NotNull @Min(1) Integer position
) {}

package com.vhstudio.formsapi.utils.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateFormRequest(
    @NotBlank String title,
    String description
) {}

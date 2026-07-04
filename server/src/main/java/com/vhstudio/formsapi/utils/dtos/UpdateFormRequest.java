package com.vhstudio.formsapi.utils.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdateFormRequest(
    @NotBlank String title,
    String description
) {}

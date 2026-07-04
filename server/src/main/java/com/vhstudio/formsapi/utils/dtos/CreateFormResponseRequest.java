package com.vhstudio.formsapi.utils.dtos;

import jakarta.validation.constraints.Email;

public record CreateFormResponseRequest(
    String respondentName,
    @Email String respondentEmail
) {}

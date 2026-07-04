package com.vhstudio.formsapi.utils.dtos;

import java.util.UUID;

public record PublicQuestionOptionResponse(
    UUID id,
    String label,
    String value,
    Integer position
) {}

package com.vhstudio.formsapi.utils.dtos;

import java.util.UUID;

public record CreateFormResponseResponse(
    UUID responseId,
    String accessToken
) {}

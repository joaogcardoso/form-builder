package com.vhstudio.formsapi.utils.dtos;

import java.util.List;
import java.util.UUID;

public record PublicSectionResponse(
    UUID id,
    String title,
    String description,
    Integer position,
    List<PublicQuestionResponse> questions
) {}

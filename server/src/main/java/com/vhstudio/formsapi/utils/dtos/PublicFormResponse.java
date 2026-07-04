package com.vhstudio.formsapi.utils.dtos;

import java.util.List;
import java.util.UUID;

public record PublicFormResponse(
    UUID id,
    String title,
    String description,
    String publicSlug,
    List<PublicSectionResponse> sections
) {}

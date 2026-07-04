package com.vhstudio.formsapi.utils.dtos;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record FormDetailsResponse(
    UUID id,
    String title,
    String description,
    Boolean published,
    String publicSlug,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    List<SectionResponseDTO> sections
) {}

package com.vhstudio.formsapi.utils.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record FormResponseDTO(
    UUID id,
    String title,
    String description,
    Boolean published,
    String publicSlug,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}

package com.vhstudio.formsapi.utils.dtos;

import java.util.UUID;

public record AuthResponse(
    String token,
    UUID userId,
    String name,
    String email
) {}

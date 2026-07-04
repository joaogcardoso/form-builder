package com.vhstudio.formsapi.utils.dtos;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record SubmitQuestionAnswerRequest(
    @NotNull UUID questionId,
    String value
) {}

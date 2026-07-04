package com.vhstudio.formsapi.utils.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record SubmitFormResponseRequest(
    @NotBlank String accessToken,
    @NotNull @Valid List<SubmitQuestionAnswerRequest> answers
) {}

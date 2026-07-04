package com.vhstudio.formsapi.controllers;

import com.vhstudio.formsapi.services.QuestionOptionService;
import com.vhstudio.formsapi.utils.dtos.CreateQuestionOptionRequest;
import com.vhstudio.formsapi.utils.dtos.QuestionOptionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.UpdateQuestionOptionRequest;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class QuestionOptionController {
    private final QuestionOptionService questionOptionService;

    public QuestionOptionController(QuestionOptionService questionOptionService) {
        this.questionOptionService = questionOptionService;
    }

    @PostMapping("/questions/{questionId}/options")
    public ResponseEntity<QuestionOptionResponseDTO> createOption(
        @PathVariable UUID questionId,
        @Valid @RequestBody CreateQuestionOptionRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionOptionService.createOption(questionId, request));
    }

    @GetMapping("/questions/{questionId}/options")
    public ResponseEntity<List<QuestionOptionResponseDTO>> getOptionsByQuestion(@PathVariable UUID questionId) {
        return ResponseEntity.ok(questionOptionService.getOptionsByQuestion(questionId));
    }

    @PutMapping("/questions/options/{optionId}")
    public ResponseEntity<QuestionOptionResponseDTO> updateOption(
        @PathVariable UUID optionId,
        @Valid @RequestBody UpdateQuestionOptionRequest request
    ) {
        return ResponseEntity.ok(questionOptionService.updateOption(optionId, request));
    }

    @DeleteMapping("/questions/options/{optionId}")
    public ResponseEntity<Void> deleteOption(@PathVariable UUID optionId) {
        questionOptionService.deleteOption(optionId);
        return ResponseEntity.noContent().build();
    }
}

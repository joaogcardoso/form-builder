package com.vhstudio.formsapi.controllers;

import com.vhstudio.formsapi.services.QuestionService;
import com.vhstudio.formsapi.utils.dtos.CreateQuestionRequest;
import com.vhstudio.formsapi.utils.dtos.QuestionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.UpdateQuestionRequest;
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
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/sections/{sectionId}/questions")
    public ResponseEntity<QuestionResponseDTO> createQuestion(
        @PathVariable UUID sectionId,
        @Valid @RequestBody CreateQuestionRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(sectionId, request));
    }

    @GetMapping("/sections/{sectionId}/questions")
    public ResponseEntity<List<QuestionResponseDTO>> getQuestionsBySection(@PathVariable UUID sectionId) {
        return ResponseEntity.ok(questionService.getQuestionsBySection(sectionId));
    }

    @PutMapping("/questions/{questionId}")
    public ResponseEntity<QuestionResponseDTO> updateQuestion(
        @PathVariable UUID questionId,
        @Valid @RequestBody UpdateQuestionRequest request
    ) {
        return ResponseEntity.ok(questionService.updateQuestion(questionId, request));
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable UUID questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }
}

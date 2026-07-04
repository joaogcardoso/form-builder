package com.vhstudio.formsapi.controllers;

import com.vhstudio.formsapi.services.FormService;
import com.vhstudio.formsapi.services.PublicResponseService;
import com.vhstudio.formsapi.utils.dtos.CreateFormResponseRequest;
import com.vhstudio.formsapi.utils.dtos.CreateFormResponseResponse;
import com.vhstudio.formsapi.utils.dtos.PublicFormResponse;
import com.vhstudio.formsapi.utils.dtos.SubmitFormResponseRequest;
import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicFormController {
    private final FormService formService;
    private final PublicResponseService publicResponseService;

    public PublicFormController(FormService formService, PublicResponseService publicResponseService) {
        this.formService = formService;
        this.publicResponseService = publicResponseService;
    }

    @GetMapping("/forms/{publicSlug}")
    public ResponseEntity<PublicFormResponse> getPublicForm(@PathVariable String publicSlug) {
        return ResponseEntity.ok(formService.getPublicForm(publicSlug));
    }

    @PostMapping("/forms/{publicSlug}/responses")
    public ResponseEntity<CreateFormResponseResponse> createFormResponse(
        @PathVariable String publicSlug,
        @Valid @RequestBody(required = false) CreateFormResponseRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(publicResponseService.createFormResponse(publicSlug, request));
    }

    @PostMapping("/responses/{responseId}/submit")
    public ResponseEntity<Void> submitFormResponse(
        @PathVariable UUID responseId,
        @Valid @RequestBody SubmitFormResponseRequest request
    ) {
        publicResponseService.submitFormResponse(responseId, request);
        return ResponseEntity.noContent().build();
    }
}

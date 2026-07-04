package com.vhstudio.formsapi.controllers;

import com.vhstudio.formsapi.services.OwnerResponseService;
import com.vhstudio.formsapi.utils.dtos.OwnerFormResponseDTO;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/forms/{formId}/responses")
public class OwnerResponseController {
    private final OwnerResponseService ownerResponseService;

    public OwnerResponseController(OwnerResponseService ownerResponseService) {
        this.ownerResponseService = ownerResponseService;
    }

    @GetMapping
    public ResponseEntity<List<OwnerFormResponseDTO>> listFormResponses(@PathVariable UUID formId) {
        return ResponseEntity.ok(ownerResponseService.listFormResponses(formId));
    }

    @GetMapping("/{responseId}")
    public ResponseEntity<OwnerFormResponseDTO> getFormResponseDetails(
        @PathVariable UUID formId,
        @PathVariable UUID responseId
    ) {
        return ResponseEntity.ok(ownerResponseService.getFormResponseDetails(formId, responseId));
    }
}

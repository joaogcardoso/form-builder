package com.vhstudio.formsapi.controllers;

import com.vhstudio.formsapi.services.SectionService;
import com.vhstudio.formsapi.utils.dtos.CreateSectionRequest;
import com.vhstudio.formsapi.utils.dtos.SectionResponseDTO;
import com.vhstudio.formsapi.utils.dtos.UpdateSectionRequest;
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
public class SectionController {
    private final SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @PostMapping("/forms/{formId}/sections")
    public ResponseEntity<SectionResponseDTO> createSection(
        @PathVariable UUID formId,
        @Valid @RequestBody CreateSectionRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sectionService.createSection(formId, request));
    }

    @GetMapping("/forms/{formId}/sections")
    public ResponseEntity<List<SectionResponseDTO>> getSectionsByForm(@PathVariable UUID formId) {
        return ResponseEntity.ok(sectionService.getSectionsByForm(formId));
    }

    @PutMapping("/sections/{sectionId}")
    public ResponseEntity<SectionResponseDTO> updateSection(
        @PathVariable UUID sectionId,
        @Valid @RequestBody UpdateSectionRequest request
    ) {
        return ResponseEntity.ok(sectionService.updateSection(sectionId, request));
    }

    @DeleteMapping("/sections/{sectionId}")
    public ResponseEntity<Void> deleteSection(@PathVariable UUID sectionId) {
        sectionService.deleteSection(sectionId);
        return ResponseEntity.noContent().build();
    }
}

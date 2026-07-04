package com.vhstudio.formsapi.models;

import com.vhstudio.formsapi.utils.enums.ResponseStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "form_responses")
@Getter
@Setter
@NoArgsConstructor
public class FormResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "form_id", nullable = false)
    private Form form;

    private String respondentName;

    private String respondentEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResponseStatus status;

    @Column(nullable = false, unique = true)
    private String accessToken;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime startedAt;

    private LocalDateTime finishedAt;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
        if (startedAt == null) {
            startedAt = createdAt;
        }
    }
}

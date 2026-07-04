package com.vhstudio.formsapi.repositories;

import com.vhstudio.formsapi.models.FormResponse;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormResponseRepository extends JpaRepository<FormResponse, UUID> {
    List<FormResponse> findByFormId(UUID formId);

    boolean existsByAccessToken(String accessToken);
}

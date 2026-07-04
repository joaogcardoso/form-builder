package com.vhstudio.formsapi.repositories;

import com.vhstudio.formsapi.models.Form;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormRepository extends JpaRepository<Form, UUID> {
    List<Form> findByOwnerId(UUID ownerId);

    Optional<Form> findByPublicSlug(String publicSlug);
}

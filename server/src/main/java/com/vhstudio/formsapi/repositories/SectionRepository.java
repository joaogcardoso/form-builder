package com.vhstudio.formsapi.repositories;

import com.vhstudio.formsapi.models.Section;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, UUID> {
    List<Section> findByFormIdOrderByPositionAsc(UUID formId);

    boolean existsByFormId(UUID formId);
}

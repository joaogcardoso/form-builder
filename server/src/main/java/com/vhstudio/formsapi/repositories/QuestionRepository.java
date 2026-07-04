package com.vhstudio.formsapi.repositories;

import com.vhstudio.formsapi.models.Question;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    List<Question> findBySectionIdOrderByPositionAsc(UUID sectionId);

    List<Question> findBySectionFormId(UUID formId);
}

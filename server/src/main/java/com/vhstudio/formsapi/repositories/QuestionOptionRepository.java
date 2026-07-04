package com.vhstudio.formsapi.repositories;

import com.vhstudio.formsapi.models.QuestionOption;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, UUID> {
    List<QuestionOption> findByQuestionIdOrderByPositionAsc(UUID questionId);
}

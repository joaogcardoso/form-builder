package com.vhstudio.formsapi.repositories;

import com.vhstudio.formsapi.models.QuestionAnswer;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, UUID> {
    List<QuestionAnswer> findByFormResponseId(UUID formResponseId);

    List<QuestionAnswer> findByQuestionId(UUID questionId);
}

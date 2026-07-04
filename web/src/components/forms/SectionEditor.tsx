import { Edit, Plus, Trash2 } from "lucide-react"

import { EmptyState } from "@/components/common/EmptyState"
import { QuestionEditor } from "@/components/forms/QuestionEditor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sortByPosition } from "@/lib/format"
import type { QuestionOption } from "@/types/option"
import type { Question } from "@/types/question"
import type { Section } from "@/types/section"

export function SectionEditor({
  section,
  onEditSection,
  onDeleteSection,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onAddOption,
  onEditOption,
  onDeleteOption,
}: {
  section: Section
  onEditSection: (section: Section) => void
  onDeleteSection: (section: Section) => void
  onAddQuestion: (section: Section) => void
  onEditQuestion: (question: Question) => void
  onDeleteQuestion: (question: Question) => void
  onAddOption: (question: Question) => void
  onEditOption: (option: QuestionOption, question: Question) => void
  onDeleteOption: (option: QuestionOption) => void
}) {
  const questions = sortByPosition(section.questions)

  return (
    <Card className="overflow-hidden bg-card shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 border-b bg-muted/20">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
              Seção {section.position}
            </span>
          </div>
          <CardTitle className="text-lg break-words">
            {section.title || "Seção sem título"}
          </CardTitle>
          {section.description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {section.description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            aria-label="Editar seção"
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={() => onEditSection(section)}
          >
            <Edit className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Excluir seção"
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={() => onDeleteSection(section)}
          >
            <Trash2 className="size-4 text-destructive" aria-hidden="true" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {questions.length === 0 ? (
          <EmptyState
            title="Nenhuma pergunta"
            description="Adicione uma pergunta para montar esta seção."
          />
        ) : (
          questions.map((question) => (
            <QuestionEditor
              key={question.id}
              question={question}
              onEditQuestion={onEditQuestion}
              onDeleteQuestion={onDeleteQuestion}
              onAddOption={onAddOption}
              onEditOption={onEditOption}
              onDeleteOption={onDeleteOption}
            />
          ))
        )}
        <Button
          variant="outline"
          type="button"
          onClick={() => onAddQuestion(section)}
        >
          <Plus className="size-4" aria-hidden="true" />
          Adicionar pergunta
        </Button>
      </CardContent>
    </Card>
  )
}

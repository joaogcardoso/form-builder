import { Edit, Plus, Trash2 } from "lucide-react"

import { EmptyState } from "@/components/common/EmptyState"
import { QuestionOptionEditor } from "@/components/forms/QuestionOptionEditor"
import { QuestionPreview } from "@/components/forms/QuestionPreview"
import { QuestionTypeBadge } from "@/components/forms/QuestionTypeBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { sortByPosition } from "@/lib/format"
import type { QuestionOption } from "@/types/option"
import type { Question } from "@/types/question"

export function QuestionEditor({
  question,
  onEditQuestion,
  onDeleteQuestion,
  onAddOption,
  onEditOption,
  onDeleteOption,
}: {
  question: Question
  onEditQuestion: (question: Question) => void
  onDeleteQuestion: (question: Question) => void
  onAddOption: (question: Question) => void
  onEditOption: (option: QuestionOption, question: Question) => void
  onDeleteOption: (option: QuestionOption) => void
}) {
  const canHaveOptions =
    question.type === "CHECKBOX" || question.type === "SELECTION"

  return (
    <Card className="border bg-background shadow-none">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              Pergunta {question.position}
            </span>
            <h4 className="min-w-0 font-medium break-words">
              {question.title || "Pergunta sem título"}
            </h4>
            <QuestionTypeBadge type={question.type} />
            {question.required ? (
              <span className="text-xs text-muted-foreground">Obrigatória</span>
            ) : null}
          </div>
          {question.description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {question.description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            aria-label="Editar pergunta"
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={() => onEditQuestion(question)}
          >
            <Edit className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Excluir pergunta"
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={() => onDeleteQuestion(question)}
          >
            <Trash2 className="size-4 text-destructive" aria-hidden="true" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <QuestionPreview question={question} />
        {canHaveOptions ? (
          <>
            <Separator />
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Opções</p>
                  <p className="text-xs text-muted-foreground">
                    Valores enviados quando a pessoa responder.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => onAddOption(question)}
                >
                  <Plus className="size-4" aria-hidden="true" />
                  Adicionar opção
                </Button>
              </div>
              {question.options.length === 0 ? (
                <EmptyState
                  title="Sem opções"
                  description="Adicione opções para esta pergunta."
                />
              ) : (
                sortByPosition(question.options).map((option) => (
                  <QuestionOptionEditor
                    key={option.id}
                    option={option}
                    optionType={
                      question.type === "CHECKBOX" ? "checkbox" : "radio"
                    }
                    onEdit={(selectedOption) =>
                      onEditOption(selectedOption, question)
                    }
                    onDelete={onDeleteOption}
                  />
                ))
              )}
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}

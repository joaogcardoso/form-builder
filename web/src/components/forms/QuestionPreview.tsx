import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { sortByPosition } from "@/lib/format"
import type { Question } from "@/types/question"

export function QuestionPreview({ question }: { question: Question }) {
  if (question.type === "TEXTAREA") {
    return (
      <Textarea
        disabled
        className="bg-muted/30"
        placeholder="Texto de resposta longa"
      />
    )
  }

  if (question.type === "SELECTION") {
    if (question.options.length === 0) {
      return (
        <p className="rounded-lg border border-dashed bg-background p-3 text-sm text-muted-foreground">
          Adicione opções para mostrar a prévia de seleção única.
        </p>
      )
    }

    return (
      <RadioGroup disabled>
        {sortByPosition(question.options).map((option) => (
          <label key={option.id} className="flex items-center gap-2 text-sm">
            <RadioGroupItem value={option.value} />
            {option.label}
          </label>
        ))}
      </RadioGroup>
    )
  }

  return (
    <div className="grid gap-2">
      {question.options.length === 0 ? (
        <p className="rounded-lg border border-dashed bg-background p-3 text-sm text-muted-foreground">
          Adicione opções para mostrar a prévia de múltipla escolha.
        </p>
      ) : (
        sortByPosition(question.options).map((option) => (
          <label key={option.id} className="flex items-center gap-2 text-sm">
            <Checkbox disabled />
            {option.label}
          </label>
        ))
      )}
    </div>
  )
}

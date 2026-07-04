import { Circle, Edit, Square, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { QuestionOption } from "@/types/option"

export function QuestionOptionEditor({
  option,
  optionType = "radio",
  onEdit,
  onDelete,
}: {
  option: QuestionOption
  optionType?: "checkbox" | "radio"
  onEdit: (option: QuestionOption) => void
  onDelete: (option: QuestionOption) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2">
      <div className="flex min-w-0 items-center gap-3">
        {optionType === "checkbox" ? (
          <Square
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        ) : (
          <Circle
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{option.label}</p>
          <p className="truncate text-xs text-muted-foreground">
            {option.value}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-1">
        <Button
          aria-label="Editar opção"
          variant="ghost"
          size="icon-sm"
          type="button"
          onClick={() => onEdit(option)}
        >
          <Edit className="size-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Excluir opção"
          variant="ghost"
          size="icon-sm"
          type="button"
          onClick={() => onDelete(option)}
        >
          <Trash2 className="size-4 text-destructive" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

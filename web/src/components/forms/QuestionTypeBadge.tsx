import { Badge } from "@/components/ui/badge"
import type { QuestionType } from "@/types/question"

const labels: Record<QuestionType, string> = {
  TEXTAREA: "Texto",
  CHECKBOX: "Checkbox",
  SELECTION: "Seleção",
}

export function QuestionTypeBadge({ type }: { type: QuestionType }) {
  return <Badge variant="outline">{labels[type]}</Badge>
}

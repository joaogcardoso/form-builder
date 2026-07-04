import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { sortByPosition } from "@/lib/format"
import type { PublicQuestion } from "@/types/public-form"

export type PublicAnswerValue = string | string[]

export function PublicQuestionField({
  question,
  value,
  onChange,
}: {
  question: PublicQuestion
  value: PublicAnswerValue | undefined
  onChange: (value: PublicAnswerValue) => void
}) {
  if (question.type === "TEXTAREA") {
    return (
      <Textarea
        rows={4}
        placeholder="Digite sua resposta…"
        value={typeof value === "string" ? value : ""}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (question.type === "SELECTION") {
    return (
      <RadioGroup
        value={typeof value === "string" ? value : ""}
        onValueChange={onChange}
      >
        {sortByPosition(question.options).map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-2 rounded-md px-1 py-1"
          >
            <RadioGroupItem
              id={`${question.id}-${option.id}`}
              value={option.value}
            />
            <Label htmlFor={`${question.id}-${option.id}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  const selectedValues = Array.isArray(value) ? value : []

  return (
    <div className="grid gap-2">
      {sortByPosition(question.options).map((option) => (
        <label
          key={option.id}
          className="flex items-center gap-2 rounded-md px-1 py-1 text-sm"
        >
          <Checkbox
            checked={selectedValues.includes(option.value)}
            onCheckedChange={(checked) => {
              if (checked === true) {
                onChange([...selectedValues, option.value])
              } else {
                onChange(selectedValues.filter((item) => item !== option.value))
              }
            }}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}

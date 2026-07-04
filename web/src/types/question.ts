import type { QuestionOption } from "@/types/option"

export type QuestionType = "TEXTAREA" | "CHECKBOX" | "SELECTION"

export type Question = {
  id: string
  sectionId?: string
  title: string
  description: string
  type: QuestionType
  required: boolean
  position: number
  options: QuestionOption[]
}

export type CreateQuestionRequest = {
  title: string
  description: string
  type: QuestionType
  required: boolean
  position: number
}

export type UpdateQuestionRequest = CreateQuestionRequest

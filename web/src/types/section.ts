import type { Question } from "@/types/question"

export type Section = {
  id: string
  formId: string
  title: string
  description: string
  position: number
  questions: Question[]
}

export type CreateSectionRequest = {
  title: string
  description: string
  position: number
}

export type UpdateSectionRequest = CreateSectionRequest

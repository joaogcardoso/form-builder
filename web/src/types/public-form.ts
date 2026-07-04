import type { QuestionType } from "@/types/question"

export type PublicQuestionOption = {
  id: string
  label: string
  value: string
  position: number
}

export type PublicQuestion = {
  id: string
  title: string
  description: string
  type: QuestionType
  required: boolean
  position: number
  options: PublicQuestionOption[]
}

export type PublicSection = {
  id: string
  title: string
  description: string
  position: number
  questions: PublicQuestion[]
}

export type PublicForm = {
  id: string
  title: string
  description: string
  publicSlug: string
  sections: PublicSection[]
}

export type CreateFormResponseResponse = {
  responseId: string
  accessToken: string
  status?: "WAITING" | "ONGOING" | "FINISHED"
}

export type CreateFormResponseRequest = {
  respondentName?: string
  respondentEmail?: string
}

export type SubmitQuestionAnswerRequest = {
  questionId: string
  value: string
}

export type SubmitFormResponseRequest = {
  accessToken: string
  answers: SubmitQuestionAnswerRequest[]
}

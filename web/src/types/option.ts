export type QuestionOption = {
  id: string
  questionId?: string
  label: string
  value: string
  position: number
}

export type CreateQuestionOptionRequest = {
  label: string
  value: string
  position: number
}

export type UpdateQuestionOptionRequest = CreateQuestionOptionRequest

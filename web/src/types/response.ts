export type FormResponseStatus = "WAITING" | "ONGOING" | "FINISHED"

export type FormResponseSummary = {
  id: string
  formId?: string
  respondentName?: string | null
  respondentEmail?: string | null
  status: FormResponseStatus
  createdAt: string
  finishedAt?: string | null
}

export type FormResponseAnswer = {
  id?: string
  questionId: string
  questionTitle?: string
  questionType?: string
  value: string
}

export type FormResponseDetails = FormResponseSummary & {
  answers: FormResponseAnswer[]
}

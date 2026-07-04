import { api } from "@/lib/api"
import type {
  CreateQuestionRequest,
  Question,
  UpdateQuestionRequest,
} from "@/types/question"

export const questionService = {
  async createQuestion(sectionId: string, data: CreateQuestionRequest) {
    const response = await api.post<Question>(
      `/sections/${sectionId}/questions`,
      data
    )
    return response.data
  },

  async getQuestions(sectionId: string) {
    const response = await api.get<Question[]>(
      `/sections/${sectionId}/questions`
    )
    return response.data
  },

  async updateQuestion(questionId: string, data: UpdateQuestionRequest) {
    const response = await api.put<Question>(`/questions/${questionId}`, data)
    return response.data
  },

  async deleteQuestion(questionId: string) {
    await api.delete(`/questions/${questionId}`)
  },
}

import { api } from "@/lib/api"
import type {
  CreateQuestionOptionRequest,
  QuestionOption,
  UpdateQuestionOptionRequest,
} from "@/types/option"

export const questionOptionService = {
  async createOption(questionId: string, data: CreateQuestionOptionRequest) {
    const response = await api.post<QuestionOption>(
      `/questions/${questionId}/options`,
      data
    )
    return response.data
  },

  async getOptions(questionId: string) {
    const response = await api.get<QuestionOption[]>(
      `/questions/${questionId}/options`
    )
    return response.data
  },

  async updateOption(optionId: string, data: UpdateQuestionOptionRequest) {
    const response = await api.put<QuestionOption>(
      `/questions/options/${optionId}`,
      data
    )
    return response.data
  },

  async deleteOption(optionId: string) {
    await api.delete(`/questions/options/${optionId}`)
  },
}

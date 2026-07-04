import { api } from "@/lib/api"
import type {
  CreateFormResponseRequest,
  CreateFormResponseResponse,
  PublicForm,
  SubmitFormResponseRequest,
} from "@/types/public-form"

export const publicFormService = {
  async getPublicForm(publicSlug: string) {
    const response = await api.get<PublicForm>(`/public/forms/${publicSlug}`)
    return response.data
  },

  async createFormResponse(
    publicSlug: string,
    data?: CreateFormResponseRequest
  ) {
    const response = await api.post<CreateFormResponseResponse>(
      `/public/forms/${publicSlug}/responses`,
      data
    )
    return response.data
  },

  async submitFormResponse(
    responseId: string,
    data: SubmitFormResponseRequest
  ) {
    const response = await api.post(
      `/public/responses/${responseId}/submit`,
      data
    )
    return response.data
  },
}

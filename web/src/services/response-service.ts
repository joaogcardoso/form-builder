import { api } from "@/lib/api"
import type { FormResponseDetails, FormResponseSummary } from "@/types/response"

export const ownerResponseService = {
  async getFormResponses(formId: string) {
    const response = await api.get<FormResponseSummary[]>(
      `/forms/${formId}/responses`
    )
    return response.data
  },

  async getFormResponseDetails(formId: string, responseId: string) {
    const response = await api.get<FormResponseDetails>(
      `/forms/${formId}/responses/${responseId}`
    )
    return response.data
  },
}

import { api } from "@/lib/api"
import type {
  CreateSectionRequest,
  Section,
  UpdateSectionRequest,
} from "@/types/section"

export const sectionService = {
  async createSection(formId: string, data: CreateSectionRequest) {
    const response = await api.post<Section>(`/forms/${formId}/sections`, data)
    return response.data
  },

  async getSections(formId: string) {
    const response = await api.get<Section[]>(`/forms/${formId}/sections`)
    return response.data
  },

  async updateSection(sectionId: string, data: UpdateSectionRequest) {
    const response = await api.put<Section>(`/sections/${sectionId}`, data)
    return response.data
  },

  async deleteSection(sectionId: string) {
    await api.delete(`/sections/${sectionId}`)
  },
}

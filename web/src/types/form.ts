import type { Section } from "@/types/section"

export type Form = {
  id: string
  title: string
  description: string
  published: boolean
  publicSlug: string | null
  createdAt: string
  updatedAt: string
}

export type FormDetails = Form & {
  sections: Section[]
}

export type CreateFormRequest = {
  title: string
  description: string
}

export type UpdateFormRequest = CreateFormRequest

import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe o e-mail.")
    .email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe a senha."),
})

export const registerSchema = z.object({
  name: z.string().min(1, "Informe seu nome."),
  email: z
    .string()
    .min(1, "Informe o e-mail.")
    .email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
})

export const formSchema = z.object({
  title: z.string().min(1, "Informe o título."),
  description: z.string(),
})

export const sectionSchema = z.object({
  title: z.string().min(1, "Informe o título da seção."),
  description: z.string(),
  position: z.number().int().min(1, "A posição deve ser maior que zero."),
})

export const questionSchema = z.object({
  title: z.string().min(1, "Informe o título da pergunta."),
  description: z.string(),
  type: z.enum(["TEXTAREA", "CHECKBOX", "SELECTION"]),
  required: z.boolean(),
  position: z.number().int().min(1, "A posição deve ser maior que zero."),
})

export const questionOptionSchema = z.object({
  label: z.string().min(1, "Informe o texto da opção."),
  value: z.string().min(1, "Informe o valor da opção."),
  position: z.number().int().min(1, "A posição deve ser maior que zero."),
})

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
export type FormValues = z.infer<typeof formSchema>
export type SectionValues = z.infer<typeof sectionSchema>
export type QuestionValues = z.infer<typeof questionSchema>
export type QuestionOptionValues = z.infer<typeof questionOptionSchema>

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getApiErrorMessage } from "@/lib/api"
import { formSchema, type FormValues } from "@/schemas/forms"
import { formService } from "@/services/form-service"
import type { FormDetails } from "@/types/form"

export function FormEditor({
  form,
  onSaved,
}: {
  form: FormDetails
  onSaved: () => void
}) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: form.title, description: form.description },
  })

  useEffect(() => {
    reset({ title: form.title, description: form.description })
  }, [form.description, form.title, reset])

  async function onSubmit(values: FormValues) {
    try {
      await formService.updateForm(form.id, values)
      toast.success("Formulário salvo.")
      onSaved()
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  return (
    <Card className="overflow-hidden border-t-4 border-t-primary bg-background shadow-sm">
      <CardHeader>
        <CardTitle>Formulário</CardTitle>
        <CardDescription>
          Estes dados aparecem no topo do formulário público.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="form-title">Título</Label>
            <Input
              id="form-title"
              className="h-12 text-lg font-medium"
              autoComplete="off"
              placeholder="Formulário sem título"
              {...register("title")}
            />
            {errors.title ? (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="form-description">Descrição</Label>
            <Textarea
              id="form-description"
              rows={3}
              autoComplete="off"
              placeholder="Descreva o objetivo do formulário…"
              {...register("description")}
            />
          </div>
          <div>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="size-4" aria-hidden="true" />
              )}
              {isSubmitting ? "Salvando…" : "Salvar formulário"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

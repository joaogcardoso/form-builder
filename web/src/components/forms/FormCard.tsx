import { Calendar, Edit, Eye, FileBarChart, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { ConfirmDeleteDialog } from "@/components/common/ConfirmDeleteDialog"
import { CopyPublicLinkButton } from "@/components/forms/CopyPublicLinkButton"
import { FormStatusBadge } from "@/components/forms/FormStatusBadge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate } from "@/lib/format"
import { formService } from "@/services/form-service"
import type { Form } from "@/types/form"

export function FormCard({
  form,
  onChanged,
}: {
  form: Form
  onChanged: () => void
}) {
  async function deleteForm() {
    try {
      await formService.deleteForm(form.id)
      toast.success("Formulário excluído.")
      onChanged()
    } catch {
      toast.error("Não foi possível excluir o formulário.")
    }
  }

  async function togglePublish() {
    try {
      if (form.published) {
        await formService.unpublishForm(form.id)
        toast.success("Formulário despublicado.")
      } else {
        await formService.publishForm(form.id)
        toast.success("Formulário publicado.")
      }
      onChanged()
    } catch {
      toast.error("Não foi possível alterar a publicação.")
    }
  }

  return (
    <Card className="group overflow-hidden bg-background shadow-sm transition-colors hover:border-foreground/20">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-2 min-w-0 text-base">
            {form.title || "Formulário sem título"}
          </CardTitle>
          <FormStatusBadge published={form.published} />
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {form.description || "Sem descrição"}
        </p>
      </CardHeader>
      <CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="size-3.5" aria-hidden="true" />
        Atualizado em {formatDate(form.updatedAt || form.createdAt)}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t bg-muted/20 p-4">
        <Button asChild variant="outline" size="sm">
          <Link to={`/forms/${form.id}/builder`}>
            <Edit className="size-4" aria-hidden="true" />
            Editar
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={`/forms/${form.id}/responses`}>
            <FileBarChart className="size-4" aria-hidden="true" />
            Respostas
          </Link>
        </Button>
        {form.published && form.publicSlug ? (
          <>
            <Button asChild variant="ghost" size="sm">
              <a
                href={`/forms/public/${form.publicSlug}`}
                target="_blank"
                rel="noreferrer"
              >
                <Eye className="size-4" aria-hidden="true" />
                Visualizar
              </a>
            </Button>
            <CopyPublicLinkButton
              publicSlug={form.publicSlug}
              variant="ghost"
            />
          </>
        ) : null}
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={togglePublish}
        >
          {form.published ? "Despublicar" : "Publicar"}
        </Button>
        <ConfirmDeleteDialog
          title="Excluir formulário?"
          description="Esta ação removerá o formulário e seus dados associados."
          onConfirm={deleteForm}
          trigger={
            <Button variant="destructive" size="sm" type="button">
              <Trash2 className="size-4" aria-hidden="true" />
              Excluir
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}

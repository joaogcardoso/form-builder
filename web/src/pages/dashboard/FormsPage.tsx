import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

import { EmptyState } from "@/components/common/EmptyState"
import { ErrorState } from "@/components/common/ErrorState"
import { LoadingState } from "@/components/common/LoadingState"
import { PageHeader } from "@/components/common/PageHeader"
import { FormCard } from "@/components/forms/FormCard"
import { Button } from "@/components/ui/button"
import { useForms } from "@/hooks/useForms"

export function FormsPage() {
  const { forms, isLoading, error, loadForms } = useForms()

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Meus formulários"
        description="Uma visão organizada dos formulários em rascunho e publicados."
        action={
          <Button asChild>
            <Link to="/forms/new">
              <Plus className="size-4" aria-hidden="true" />
              Novo formulário
            </Link>
          </Button>
        }
      />
      {isLoading ? <LoadingState label="Carregando formulários…" /> : null}
      {error ? <ErrorState error={error} /> : null}
      {!isLoading && !error && forms.length === 0 ? (
        <EmptyState
          title="Nenhum formulário encontrado"
          description="Crie um formulário para organizar perguntas em seções e receber respostas."
          action={
            <Button asChild>
              <Link to="/forms/new">Criar formulário</Link>
            </Button>
          }
        />
      ) : null}
      {!isLoading && !error && forms.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {forms.map((form) => (
            <FormCard key={form.id} form={form} onChanged={loadForms} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

import { FileText, Plus } from "lucide-react"
import { Link } from "react-router-dom"

import { EmptyState } from "@/components/common/EmptyState"
import { ErrorState } from "@/components/common/ErrorState"
import { LoadingState } from "@/components/common/LoadingState"
import { PageHeader } from "@/components/common/PageHeader"
import { FormCard } from "@/components/forms/FormCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useForms } from "@/hooks/useForms"

export function DashboardPage() {
  const { user } = useAuth()
  const { forms, isLoading, error, loadForms } = useForms()
  const recentForms = forms.slice(0, 3)

  return (
    <div className="grid gap-6">
      <PageHeader
        title={`Olá, ${user?.name || "bem-vindo"}`}
        description="Gerencie seus formulários, publique links e acompanhe respostas recebidas."
        action={
          <Button asChild>
            <Link to="/forms/new">
              <Plus className="size-4" aria-hidden="true" />
              Novo formulário
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-background shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de formulários
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <FileText
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-3xl font-semibold">{forms.length}</span>
          </CardContent>
        </Card>
        <Card className="bg-background shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Publicados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold">
              {forms.filter((form) => form.published).length}
            </span>
          </CardContent>
        </Card>
        <Card className="bg-background shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rascunhos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold">
              {forms.filter((form) => !form.published).length}
            </span>
          </CardContent>
        </Card>
      </div>

      {isLoading ? <LoadingState label="Carregando formulários…" /> : null}
      {error ? <ErrorState error={error} /> : null}
      {!isLoading && !error && recentForms.length === 0 ? (
        <EmptyState
          title="Nenhum formulário ainda"
          description="Crie seu primeiro formulário para começar a coletar respostas."
          action={
            <Button asChild>
              <Link to="/forms/new">Criar formulário</Link>
            </Button>
          }
        />
      ) : null}
      {!isLoading && !error && recentForms.length > 0 ? (
        <section className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Recentes</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/forms">Ver todos</Link>
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {recentForms.map((form) => (
              <FormCard key={form.id} form={form} onChanged={loadForms} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

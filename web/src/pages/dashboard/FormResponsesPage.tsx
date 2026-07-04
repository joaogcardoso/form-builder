import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { EmptyState } from "@/components/common/EmptyState"
import { ErrorState } from "@/components/common/ErrorState"
import { LoadingState } from "@/components/common/LoadingState"
import { PageHeader } from "@/components/common/PageHeader"
import { ResponseList } from "@/components/responses/ResponseList"
import { Button } from "@/components/ui/button"
import { ownerResponseService } from "@/services/response-service"
import type { FormResponseSummary } from "@/types/response"

export function FormResponsesPage() {
  const { formId } = useParams()
  const [responses, setResponses] = useState<FormResponseSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (!formId) return
    const currentFormId = formId
    async function loadResponses() {
      setIsLoading(true)
      try {
        setResponses(await ownerResponseService.getFormResponses(currentFormId))
      } catch (requestError) {
        setError(requestError)
      } finally {
        setIsLoading(false)
      }
    }
    void loadResponses()
  }, [formId])

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Respostas recebidas"
        description={
          responses.length > 0
            ? `${responses.length} resposta${responses.length === 1 ? "" : "s"} encontrada${responses.length === 1 ? "" : "s"}.`
            : "Acompanhe os envios deste formulário."
        }
        action={
          formId ? (
            <Button asChild variant="outline">
              <Link to={`/forms/${formId}/builder`}>Voltar ao editor</Link>
            </Button>
          ) : null
        }
      />
      {isLoading ? <LoadingState label="Carregando respostas…" /> : null}
      {error ? <ErrorState error={error} /> : null}
      {!isLoading && !error && responses.length === 0 ? (
        <EmptyState
          title="Nenhuma resposta recebida"
          description="Quando alguém responder o formulário publicado, o envio aparecerá aqui."
        />
      ) : null}
      {!isLoading && !error && formId && responses.length > 0 ? (
        <ResponseList formId={formId} responses={responses} />
      ) : null}
    </div>
  )
}

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { ErrorState } from "@/components/common/ErrorState"
import { LoadingState } from "@/components/common/LoadingState"
import { PageHeader } from "@/components/common/PageHeader"
import { ResponseDetails } from "@/components/responses/ResponseDetails"
import { Button } from "@/components/ui/button"
import { ownerResponseService } from "@/services/response-service"
import type { FormResponseDetails } from "@/types/response"

export function FormResponseDetailsPage() {
  const { formId, responseId } = useParams()
  const [response, setResponse] = useState<FormResponseDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    if (!formId || !responseId) return
    const currentFormId = formId
    const currentResponseId = responseId
    async function loadResponse() {
      setIsLoading(true)
      try {
        setResponse(
          await ownerResponseService.getFormResponseDetails(
            currentFormId,
            currentResponseId
          )
        )
      } catch (requestError) {
        setError(requestError)
      } finally {
        setIsLoading(false)
      }
    }
    void loadResponse()
  }, [formId, responseId])

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Detalhes da resposta"
        description="Veja cada pergunta respondida neste envio."
        action={
          formId ? (
            <Button asChild variant="outline">
              <Link to={`/forms/${formId}/responses`}>Voltar às respostas</Link>
            </Button>
          ) : null
        }
      />
      {isLoading ? <LoadingState label="Carregando resposta…" /> : null}
      {error ? <ErrorState error={error} /> : null}
      {!isLoading && !error && response ? (
        <ResponseDetails response={response} />
      ) : null}
    </div>
  )
}

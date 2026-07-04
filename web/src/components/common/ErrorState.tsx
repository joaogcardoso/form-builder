import { AlertCircle } from "lucide-react"
import type { ReactNode } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getApiErrorMessage } from "@/lib/api"

export function ErrorState({
  error,
  action,
}: {
  error: unknown
  action?: ReactNode
}) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="size-4" aria-hidden="true" />
      <AlertTitle>Algo deu errado</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>{getApiErrorMessage(error)}</p>
        {action}
      </AlertDescription>
    </Alert>
  )
}

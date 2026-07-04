import { useCallback, useEffect, useState } from "react"

import { formService } from "@/services/form-service"
import type { Form } from "@/types/form"

export function useForms() {
  const [forms, setForms] = useState<Form[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const loadForms = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await formService.getForms()
      setForms(data)
    } catch (requestError) {
      setError(requestError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadForms()
  }, [loadForms])

  return { forms, setForms, isLoading, error, loadForms }
}

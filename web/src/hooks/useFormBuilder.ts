import { useCallback, useEffect, useState } from "react"

import { formService } from "@/services/form-service"
import type { FormDetails } from "@/types/form"

export function useFormBuilder(formId: string | undefined) {
  const [form, setForm] = useState<FormDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const loadForm = useCallback(async () => {
    if (!formId) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await formService.getFormById(formId)
      setForm(data)
    } catch (requestError) {
      setError(requestError)
    } finally {
      setIsLoading(false)
    }
  }, [formId])

  useEffect(() => {
    void loadForm()
  }, [loadForm])

  return { form, setForm, isLoading, error, loadForm }
}

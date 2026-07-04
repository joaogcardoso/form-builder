import { useCallback, useEffect, useState } from "react"

import { publicFormService } from "@/services/public-form-service"
import type { PublicForm } from "@/types/public-form"

export function usePublicForm(publicSlug: string | undefined) {
  const [form, setForm] = useState<PublicForm | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const loadForm = useCallback(async () => {
    if (!publicSlug) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await publicFormService.getPublicForm(publicSlug)
      setForm(data)
    } catch (requestError) {
      setError(requestError)
    } finally {
      setIsLoading(false)
    }
  }, [publicSlug])

  useEffect(() => {
    void loadForm()
  }, [loadForm])

  return { form, isLoading, error, loadForm }
}

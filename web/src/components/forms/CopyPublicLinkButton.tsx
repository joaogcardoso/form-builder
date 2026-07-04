import { Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function getPublicFormLink(publicSlug: string) {
  return `${window.location.origin}/forms/public/${publicSlug}`
}

export function CopyPublicLinkButton({
  publicSlug,
  variant = "outline",
}: {
  publicSlug: string | null
  variant?: "default" | "outline" | "ghost"
}) {
  if (!publicSlug) return null
  const slug = publicSlug

  async function copyPublicLink() {
    await navigator.clipboard.writeText(getPublicFormLink(slug))
    toast.success("Link público copiado.")
  }

  return (
    <Button variant={variant} type="button" onClick={copyPublicLink}>
      <Copy className="size-4" />
      Copiar link
    </Button>
  )
}

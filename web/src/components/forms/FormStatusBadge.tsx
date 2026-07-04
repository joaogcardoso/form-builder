import { Badge } from "@/components/ui/badge"

export function FormStatusBadge({ published }: { published: boolean }) {
  return (
    <Badge variant={published ? "default" : "secondary"}>
      {published ? "Publicado" : "Rascunho"}
    </Badge>
  )
}

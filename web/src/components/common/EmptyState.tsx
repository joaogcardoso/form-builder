import { Inbox } from "lucide-react"
import type { ReactNode } from "react"

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-dashed bg-card/70 p-8 text-center">
      <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-muted">
        <Inbox className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="text-base font-medium text-pretty">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-pretty text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

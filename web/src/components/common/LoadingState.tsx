import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState({ label = "Carregando…" }: { label?: string }) {
  return (
    <div className="grid gap-3" aria-live="polite" aria-busy="true">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-28 w-full rounded-xl" />
    </div>
  )
}

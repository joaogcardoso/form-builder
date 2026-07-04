export function formatDate(date: string | null | undefined) {
  if (!date) return "-"
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date))
}

export function sortByPosition<T extends { position: number }>(items: T[]) {
  return [...items].sort((first, second) => first.position - second.position)
}

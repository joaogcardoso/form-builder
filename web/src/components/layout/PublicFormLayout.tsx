import { Outlet } from "react-router-dom"

export function PublicFormLayout() {
  return (
    <main className="min-h-svh bg-muted/30 px-4 py-6">
      <Outlet />
    </main>
  )
}

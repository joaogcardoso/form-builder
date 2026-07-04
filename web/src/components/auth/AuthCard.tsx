import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <Card className="border bg-background shadow-sm">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <div className="mt-5 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      </CardContent>
    </Card>
  )
}

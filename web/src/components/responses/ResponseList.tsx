import { CalendarClock, Mail, UserRound } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/format"
import type { FormResponseSummary } from "@/types/response"

export function ResponseList({
  formId,
  responses,
}: {
  formId: string
  responses: FormResponseSummary[]
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Respondente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criada em</TableHead>
            <TableHead>Finalizada em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses.map((response) => (
            <TableRow key={response.id}>
              <TableCell>
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <UserRound
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      {response.respondentName || "Pessoa externa"}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="size-3" aria-hidden="true" />
                      <span className="truncate">
                        {response.respondentEmail || "Sem e-mail"}
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    response.status === "FINISHED" ? "default" : "secondary"
                  }
                >
                  {response.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarClock className="size-3.5" aria-hidden="true" />
                  {formatDate(response.createdAt)}
                </span>
              </TableCell>
              <TableCell>{formatDate(response.finishedAt)}</TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/forms/${formId}/responses/${response.id}`}>
                    Abrir
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

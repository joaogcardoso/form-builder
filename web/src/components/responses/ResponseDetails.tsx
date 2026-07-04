import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/format"
import type { FormResponseDetails } from "@/types/response"

function formatAnswerValue(value: string) {
  try {
    const parsed = JSON.parse(value) as unknown
    if (Array.isArray(parsed)) return parsed.join(", ")
  } catch {
    return value
  }
  return value
}

export function ResponseDetails({
  response,
}: {
  response: FormResponseDetails
}) {
  return (
    <div className="grid gap-4">
      <Card className="bg-background shadow-sm">
        <CardHeader>
          <CardTitle>Dados da resposta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Status</p>
            <Badge
              className="mt-1"
              variant={response.status === "FINISHED" ? "default" : "secondary"}
            >
              {response.status}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Respondente
            </p>
            <p className="mt-1">
              {response.respondentName || "Pessoa externa"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Criada em
            </p>
            <p className="mt-1">{formatDate(response.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Finalizada em
            </p>
            <p className="mt-1">{formatDate(response.finishedAt)}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background shadow-sm">
        <CardHeader>
          <CardTitle>Respostas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {response.answers.map((answer) => (
            <div
              key={answer.id || answer.questionId}
              className="rounded-xl border bg-card p-4"
            >
              <p className="font-medium break-words">
                {answer.questionTitle || answer.questionId}
              </p>
              <p className="mt-2 text-sm whitespace-pre-wrap text-muted-foreground">
                {formatAnswerValue(answer.value)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

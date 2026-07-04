import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { AuthCard } from "@/components/auth/AuthCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import { getApiErrorMessage } from "@/lib/api"
import { loginSchema, type LoginValues } from "@/schemas/forms"

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(values: LoginValues) {
    try {
      await login(values)
      toast.success("Login realizado.")
      navigate("/dashboard")
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  return (
    <AuthCard
      title="Entrar"
      description="Acesse sua conta para gerenciar formulários e respostas."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link
            className="font-medium text-foreground underline"
            to="/register"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="voce@empresa.com"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          {isSubmitting ? "Entrando…" : "Entrar"}
        </Button>
      </form>
    </AuthCard>
  )
}

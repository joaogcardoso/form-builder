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
import { registerSchema, type RegisterValues } from "@/schemas/forms"

export function RegisterPage() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(values: RegisterValues) {
    try {
      await registerUser(values)
      toast.success("Conta criada.")
      navigate("/dashboard")
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  return (
    <AuthCard
      title="Criar conta"
      description="Comece a criar formulários e compartilhar links públicos."
      footer={
        <>
          Já tem conta?{" "}
          <Link className="font-medium text-foreground underline" to="/login">
            Entrar
          </Link>
        </>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Seu nome"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
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
            autoComplete="new-password"
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
          {isSubmitting ? "Criando conta…" : "Criar conta"}
        </Button>
      </form>
    </AuthCard>
  )
}

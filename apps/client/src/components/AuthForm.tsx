import { authSchema, AuthSchema, UserWithoutPassword } from "@waalaxy-test/utils"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { css } from "../../styled-system/css"
import { httpClient } from "../services/api.ts"
import { useAuthStore } from "../stores/auth.ts"
import Field from "./common/Field.tsx"
import FieldError from "./common/FieldError.tsx"

interface Props {
  action: "login" | "register"
}

const AuthForm: Component<Props> = ({ action }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  })
  const login = useAuthStore((state) => state.login)

  const mutation = useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (payload: AuthSchema) =>
      httpClient.post(action === "register" ? "auth/register" : "auth/login", {
        body: JSON.stringify(payload),
      }),
    onSuccess: async (response) => {
      const data = (await response.json()) satisfies { token: string; user: UserWithoutPassword }

      login(data.token, data.user)
    },
  })

  return (
    <div>
      <form onSubmit={handleSubmit((payload) => mutation.mutateAsync(payload))}>
        <Field label="Nom d'utilistaeur" {...register("username")} />
        <FieldError error={errors.username} />
        <Field label="Mot de passe" type="password" {...register("password")} />
        <FieldError error={errors.password} />
        <div className={css({ textAlign: "center", mt: 3 })}>
          <button
            className={css({
              px: 4,
              py: 1,
              fontWeight: "semibold",
              fontSize: "lg",
              bgColor: "primary",
              shadow: "md",
              rounded: "sm",
              cursor: "pointer",
              color: "white",
              _hover: { scale: 1.05 },
              _disabled: { opacity: 0.5, cursor: "not-allowed" },
            })}
            disabled={mutation.isPending}
            type="submit"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm

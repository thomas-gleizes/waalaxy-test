import { z } from "zod"

export const authSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(24, "Le nom d'utilisateur doit contenir au plus 24 caractères"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 8 caractères")
    .max(24, "Le mot de passe doit contenir au plus 24 caractères"),
})

export type AuthSchema = z.infer<typeof authSchema>

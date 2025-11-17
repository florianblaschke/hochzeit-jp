import type { Infer, SuperValidated } from "sveltekit-superforms";
import z from "zod";

export const loginSchema = z.object({
  email: z.string(),
  name: z.string().optional(),
  password: z.string().optional()
})

export type LoginSchema = typeof loginSchema;
export type LoginForm = SuperValidated<Infer<LoginSchema>>

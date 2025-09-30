import type { Infer, SuperValidated } from "sveltekit-superforms";
import z from "zod";

export const guestSchema = z.object({
  email: z.string(),
  name: z.string().min(2)
})

export type GuestSchema = typeof guestSchema;
export type GuestForm = SuperValidated<Infer<GuestSchema>>

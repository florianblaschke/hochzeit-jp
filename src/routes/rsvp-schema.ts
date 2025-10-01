import type { Infer, SuperValidated } from "sveltekit-superforms";
import z from "zod";

export const rsvpSchema = z.object({
  attending: z.enum(["true", "false"]),
  message: z.string().optional()
})

export type RsvpSchema = typeof rsvpSchema;
export type RsvpForm = SuperValidated<Infer<RsvpSchema>>

import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const guestSchema = z.object({
  name: z.string(),
  email: z.email()
});

export const load = async () => {
  const form = await superValidate(zod4(guestSchema));

  return { form };
};

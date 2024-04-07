import { z } from "zod";

// handle input validation for login, signup

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export type SignupInput = z.infer<typeof SignupSchema>;

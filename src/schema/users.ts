import { z } from "zod";

// handle input validation for login, signup

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.string(),
});

export const CommentSchema = z.object({
  content: z.string().min(1),
  // postId: z.number(),
  // userId: z.number(),
});

export type SignupInput = z.infer<typeof SignupSchema>;

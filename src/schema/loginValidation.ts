import z from "zod";

const LoginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  remember: z.boolean().optional(),
});

export default LoginSchema;

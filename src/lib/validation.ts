import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

// Lightweight phone check: accept E.164-ish or local digits with optional +/spaces.
const phoneSchema = z
  .string()
  .trim()
  .min(6, "Enter a valid phone number")
  .regex(/^\+?[0-9\s-]+$/, "Enter a valid phone number");

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

export type SignupForm = z.infer<typeof signupFormSchema>;

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function flattenZodErrors<T>(error: z.ZodError): FieldErrors<T> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !result[key]) {
      result[key] = issue.message;
    }
  }
  return result as FieldErrors<T>;
}

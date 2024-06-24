import { z } from "zod";
import { isPasswordComplex } from "@/libs";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .email({
        message: "This is not a valid email.",
      }),
    password: z.string().min(8, {
      message: "password must be at least 8 characters.",
    }),
    passwordConfirm: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (!isPasswordComplex(password)) {
      ctx.addIssue({
        path: ["password"],
        code: "custom",
        message:
          "password should include lowercase, upper case, special characters, and numbers",
      });
    }

    if (passwordConfirm !== password) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export type SignupSchema = z.infer<typeof signupSchema>;

import { z } from "zod";
import { isPasswordComplex } from "@/libs";

export const signinSchema = z
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
  })
  .superRefine(({ password }, ctx) => {
    if (!isPasswordComplex(password)) {
      ctx.addIssue({
        path: ["password"],
        code: "custom",
        message:
          "password must include lowercase, upper case, special characters, and numbers",
      });
    }
  });

export type SigninSchema = z.infer<typeof signinSchema>;

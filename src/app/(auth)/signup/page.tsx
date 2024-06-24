"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "@/schemas/signup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/core";
import { Button } from "@/components/ui/button";

import { useBoolean } from "@/hooks";

export default function Signup() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const { value: isLoading, setValue: setIsLoading } = useBoolean(false);

  const handleSubmit = async (formValues: SignupSchema) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });

      const data: ResponseModel = await res.json();

      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <h1 className="mb-6 text-2xl font-bold md:mb-8 lg:mb-10 sm:text-3xl md:text-4xl">
        Get Started !
      </h1>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password confirm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-6" loading={isLoading}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}

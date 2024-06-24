"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, SigninSchema } from "@/schemas/signin";

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

import { signIn, useSession } from "next-auth/react";

export default function Signin() {
  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (formValues: SigninSchema) => {
    console.log("formValues: ", formValues);
  };

  const session = useSession();

  console.log("🚀 ~ Signin ~ session:", session);

  return (
    <Form {...form}>
      <h1 className="mb-6 text-2xl font-bold md:mb-8 lg:mb-10 sm:text-3xl md:text-4xl">
        Welcome Back !
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
        <Button type="submit" className="w-full mt-6">
          Sign in
        </Button>
      </form>
    </Form>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { serverEnv } from "@/config/server.env";
import { LoginInput, loginSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Metadata } from "next";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, setError } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onsubmit = (data: LoginInput) => {
    startTransition(async () => {
      console.log(data);
    });
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <FieldGroup>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Email..."
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="relative">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <div>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Password..."
                  aria-invalid={fieldState.invalid}
                  type={open ? "text" : "password"}
                />
                <button onClick={() => setOpen(!open)} type="button">
                  {open ? (
                    <Eye className="absolute right-3 top-10 h-5 w-5" />
                  ) : (
                    <EyeOff className="absolute right-3 top-10 h-5 w-5" />
                  )}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button className=" rounded-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Creating yout acccount...{" "}
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterInput, registerSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { register } from "@/lib/actions/auth.action";

export default function RegisterForm() {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, setError } = useForm<RegisterInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

    const [isPending, startTransition] = useTransition();

    const onsubmit = (data: RegisterInput) => {
      startTransition( async () => {
        const res = await register(data);
        if (!res.success && res.code === 'EMAIL_ALREADY_EXISTS') {
          setError('email', { message: res.message})
        }
        console.log(res)
      })
    }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <FieldGroup>
        {/* Name */}
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="First Name..."
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* email */}
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
        {/* Password */}
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

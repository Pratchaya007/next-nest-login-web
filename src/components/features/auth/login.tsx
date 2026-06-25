"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { serverEnv } from "@/config/server.env";
import { login } from "@/lib/actions/auth.action";
import { LoginInput, loginSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, Eye, EyeOff, Loader } from "lucide-react";
import { Metadata } from "next";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onsubmit = (data: LoginInput) => {
    startTransition(async () => {
      const res = await login(data);
      if (!res.success) {
        setError("root", {
          message: "The email or password you entered is incorrect",
        });
      }
      console.log(res)
    });
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      {errors.root && (
        <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50 ">
          <AlertTriangleIcon/>
          <AlertTitle className="text-destructive">{errors.root.message}</AlertTitle>
          <AlertDescription>
            Login unsuccessful. Please verify your email and 
            password, then try again.
          </AlertDescription>
        </Alert>
      )}
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

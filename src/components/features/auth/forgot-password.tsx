"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgot } from "@/lib/actions/auth.action";
import { ForgotPassword, forgotSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Loader } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ForgotPassword>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onsubmit = (data: ForgotPassword) => {
    startTransition(async () => {
      const result = await forgot(data);
      if (!result.success) {
        setError("email", {
          message: result.message ?? "Something went wrong. Please try again",
        });
        return;
      }
      toast.success(
        "If an account with that email exists, we've sent a password reset link.",
      );
    });
    redirect('/login')
  };

  return (
    <Card className="w-full max-w-sm">
      {errors.root && (
        <Alert
          variant={"destructive"}
          className="mb-4 bg-red-100 border-red-400"
        >
          <AlertCircleIcon />
          <AlertTitle>{errors.root.message}</AlertTitle>
        </Alert>
      )}
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href={"/login"}>
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col gap-6">
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-5 ">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader className="animate-spin" />
                  Loading....{" "}
                </>
              ) : (
                "submit"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

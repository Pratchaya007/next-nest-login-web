"use client";

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
import { reset } from "@/lib/actions/auth.action";
import { resetSchema, ResterPassword } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPassword() {
  const { handleSubmit, control } = useForm<ResterPassword>({
    defaultValues: {
      password: "",
      ConfirmPassword: "",
    },
    resolver: zodResolver(resetSchema),
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // console.log(token);

  const [isPending, startTransition] = useTransition();

  if (!token) {
    redirect("/login");
  }

  const handleResetPassword = (data: ResterPassword) => {
    console.log(token);
    startTransition(async () => {
      const resutl = await reset(token, data.password);
      if(!resutl.success) {
        toast.error(resutl.message)
      }
      toast.success('Password updated successfully')
    });
    redirect('/login')
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create New Password</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="flex flex-col gap-6">
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>password</FieldLabel>
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

            <Controller
              control={control}
              name="ConfirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>ConfirmPassword</FieldLabel>
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

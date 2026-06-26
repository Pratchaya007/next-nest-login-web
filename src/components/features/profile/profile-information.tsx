'use client'

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updataUserName } from "@/lib/actions/user.action";
import { updataSchema, UpdataUser } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

interface ProfileInformaionProps {
  name?: string | null
}

export default function ProfileInformaion({name}: ProfileInformaionProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdataUser>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(updataSchema),
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter()

  const onSubmit = (name: UpdataUser) => {
    startTransition( async () => {
      await updataUserName(name)
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Email */}
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}> Name: {name}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Updata name..."
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button className=" rounded-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Update Name in....{" "}
              </>
            ) : (
              "Update"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

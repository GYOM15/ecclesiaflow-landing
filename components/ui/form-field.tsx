"use client";

import {
  type FieldValues,
  type Path,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import { Input } from "./input";
import { type ReactNode, type InputHTMLAttributes } from "react";

interface FormFieldProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  label?: string;
  helperText?: string;
  icon?: ReactNode;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  helperText,
  icon,
  register,
  errors,
  ...props
}: FormFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <Input
      label={label}
      error={errorMessage}
      helperText={helperText}
      icon={icon}
      {...register(name)}
      {...props}
    />
  );
}

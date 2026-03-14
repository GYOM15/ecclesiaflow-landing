import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  address: z
    .string()
    .min(10, "L'adresse doit contenir au moins 10 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères")
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(
      /^\+?[1-9]\d{6,14}$/,
      "Format de téléphone invalide (ex: +15141234567)"
    )
    .optional()
    .or(z.literal("")),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
      .regex(/[a-z]/, "Doit contenir au moins une lettre minuscule")
      .regex(/[A-Z]/, "Doit contenir au moins une lettre majuscule")
      .regex(/\d/, "Doit contenir au moins un chiffre")
      .regex(
        /[@$!%*?&]/,
        "Doit contenir au moins un caractère spécial (@$!%*?&)"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const socialOnboardingSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  address: z
    .string()
    .min(10, "L'adresse doit contenir au moins 10 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères")
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, "Format de téléphone invalide")
    .optional()
    .or(z.literal("")),
});

export const emailSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
});

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  address: z
    .string()
    .min(10, "L'adresse doit contenir au moins 10 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères")
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(
      /^\+?[1-9]\d{6,14}$/,
      "Format de téléphone invalide (ex: +15141234567)"
    )
    .optional()
    .or(z.literal("")),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type SocialOnboardingFormData = z.infer<typeof socialOnboardingSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

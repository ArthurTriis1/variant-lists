import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
	password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const signUpSchema = z
	.object({
		email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
		password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
		confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;

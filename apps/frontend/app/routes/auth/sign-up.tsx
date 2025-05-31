import { useState } from "react";
import { Form } from "react-router";
import { Card } from "~/components/ui/card";
import { Input, InputLabel } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { EnvelopeSimpleIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validações do servidor
  if (!email.includes("@")) {
    return { error: "E-mail inválido" };
  }

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem" };
  }

  console.log({ email, password });

  await new Promise(resolve => setTimeout(resolve, 1000));

  return { ok: true };
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEmailInvalid = email && !email.includes("@");
  const isPasswordInvalid = password && confirmPassword && password !== confirmPassword;

  return (
    <>
      <Form method="post" className="flex flex-col gap-4">
        <Input
          name="email"
          placeholder="placeholder@gmail.com"
          icon={<EnvelopeSimpleIcon size={24} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isEmailInvalid ? "E-mail inválido" : undefined}
        >
          <InputLabel>E-mail</InputLabel>
        </Input>

        <Input
          name="password"
          type="password"
          placeholder="••••••••••••"
          icon={<LockSimpleIcon size={24} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isPasswordInvalid ? "As senhas não coincidem" : undefined}
        >
          <InputLabel>Password</InputLabel>
        </Input>

        <Input
          name="confirmPassword"
          type="password"
          placeholder="••••••••••••"
          icon={<LockSimpleIcon size={24} />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={isPasswordInvalid ? "As senhas não coincidem" : undefined}
        >
          <InputLabel>Confirm Password</InputLabel>
        </Input>

        <div className="flex flex-col gap-4 mt-4">
          <Button type="submit">Subscribe</Button>
          <Link to="/sign-in" className="text-center">Sign-In</Link>
        </div>
      </Form>
    </>
  );
} 
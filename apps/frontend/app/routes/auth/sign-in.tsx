import { useState } from "react";
import { Form } from "react-router";
import { Input, InputLabel } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { EnvelopeSimpleIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log({ email, password });

  await new Promise(resolve => setTimeout(resolve, 1000));

  return { ok: true };
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const isEmailInvalid = email && !email.includes("@");

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
        >
          <InputLabel>Password</InputLabel>
        </Input>

        <div className="flex flex-col gap-4 mt-4">
          <Button type="submit">Login</Button>
          <Link to="/sign-up" className="text-center">Sign-Up</Link>
        </div>
      </Form>
    </>
  );
} 
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps } from "@conform-to/react";
import { useFetcher } from "react-router";
import { Input, InputLabel } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { EnvelopeSimpleIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import { signInSchema } from "~/schemas/auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: signInSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;
  console.log({ email, password });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { ok: true };
}

export default function SignIn() {
  const fetcher = useFetcher();
  const [form, { email, password }] = useForm({
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signInSchema });
    },
  });

  const isSubmitting = fetcher.state === "submitting";

  return (
    <>
      <fetcher.Form
        method="post"
        className="flex flex-col gap-4"
        {...getFormProps(form)}
      >
        <div>{form.errors}</div>
        <Input
          {...getInputProps(email, { type: "email" })}
          placeholder="placeholder@gmail.com"
          icon={<EnvelopeSimpleIcon size={24} />}
          error={email.errors?.[0]}
          disabled={isSubmitting}
        >
          <InputLabel>E-mail</InputLabel>
        </Input>

        <Input
          {...getInputProps(password, { type: "password" })}
          placeholder="••••••••••••"
          icon={<LockSimpleIcon size={24} />}
          error={password.errors?.[0]}
          disabled={isSubmitting}
        >
          <InputLabel>Password</InputLabel>
        </Input>

        <div className="mt-4 flex flex-col gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <Link to="/sign-up" className="text-center">
            Sign-Up
          </Link>
        </div>
      </fetcher.Form>
    </>
  );
}

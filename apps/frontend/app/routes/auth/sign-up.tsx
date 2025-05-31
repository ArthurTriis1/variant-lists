import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps } from "@conform-to/react";
import { useFetcher } from "react-router";
import { Input, InputLabel } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { EnvelopeSimpleIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router";
import { signUpSchema } from "~/schemas/auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: signUpSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;
  console.log({ email, password });

  await new Promise(resolve => setTimeout(resolve, 1000));

  return { ok: true };
}

export default function SignUp() {
  const fetcher = useFetcher();
  const [form, { email, password, confirmPassword }] = useForm({
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema });
    },
  });

  const isSubmitting = fetcher.state === "submitting";

  return (
    <>
      <fetcher.Form method="post" className="flex flex-col gap-4" {...getFormProps(form)}>
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

        <Input
          {...getInputProps(confirmPassword, { type: "password" })}
          placeholder="••••••••••••"
          icon={<LockSimpleIcon size={24} />}
          error={confirmPassword.errors?.[0]}
          disabled={isSubmitting}
        >
          <InputLabel>Confirm Password</InputLabel>
        </Input>

        <div className="flex flex-col gap-4 mt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
          <Link to="/sign-in" className="text-center">Sign-In</Link>
        </div>
      </fetcher.Form>
    </>
  );
} 
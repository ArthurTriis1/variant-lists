import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input, InputLabel } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const isInvalid = email && !email.includes("@");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-8 text-4xl font-bold">Contador: {count}</h1>

        <div className="w-full">
          <Input
            placeholder="placeholder@gmail.com"
            icon={<EnvelopeSimpleIcon size={24} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={isInvalid ? "E-mail inválido" : undefined}
          >
            <InputLabel>E-mail</InputLabel>
          </Input>
        </div>

        <div className="mt-8 flex gap-8">
          <Button onClick={() => setCount(count - 1)} variant="outline">
            Diminuir
          </Button>
          <Button onClick={() => setCount(count + 1)}>Aumentar</Button>
          <Button variant="ghost" onClick={() => setCount(0)}>
            Resetar
          </Button>
        </div>
      </Card>
    </div>
  );
}

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
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <Card className="p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8">Contador: {count}</h1>

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

        <div className="flex gap-8 mt-8">
          <Button
            onClick={() => setCount(count - 1)}
            variant="outline"
          >
            Diminuir
          </Button>
          <Button
            onClick={() => setCount(count + 1)}
          >
            Aumentar
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCount(0)}
          >
            Resetar
          </Button>
        </div>
      </Card>
    </div>
  );
}

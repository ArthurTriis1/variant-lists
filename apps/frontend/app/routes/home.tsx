import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input, InputLabel, InputError } from "../components/ui/input";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const isInvalid = email && !email.includes("@");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Contador: {count}</h1>
      
      <div className="w-full max-w-md">
        <Input 
          placeholder="placeholder@gmail.com"
          icon={<EnvelopeSimpleIcon size={24} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <InputLabel>E-mail</InputLabel>
        </Input>
        {isInvalid && <InputError>E-mail inválido</InputError>}

      </div>

      <div className="flex gap-8">
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
      </div>
    </div>
  );
}

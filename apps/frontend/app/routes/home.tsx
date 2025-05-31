import { useState } from "react";
import { Button } from "../components/ui/button";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Contador: {count}</h1>
      <div className="flex gap-2">
        <Button onClick={() => setCount(count - 1)} variant="outline">
          Diminuir
        </Button>
        <Button onClick={() => setCount(count + 1)}>
          Aumentar
        </Button>
      </div>
    </div>
  );
}

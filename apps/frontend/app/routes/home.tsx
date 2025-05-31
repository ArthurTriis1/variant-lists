import { useState } from "react";
import { Button } from "../components/ui/button";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">



      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Variantes de Botão:</h2>
        <div className="flex gap-8">
          <Button variant="default">Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
    </div>
  );
}

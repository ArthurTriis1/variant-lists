import { Outlet } from "react-router";
import { Card } from "~/components/ui/card";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-full" />
          <div className="w-8 h-4 bg-black rounded-full" />
          <div className="w-4 h-4 bg-black rounded-full" />
        </div>
      </div>
      <Card className="w-full max-w-md p-8 flex flex-col gap-8 pt-16 pb-16">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-7xl font-bold text-center">VARIANT LISTS</h1>
        </div>
        <div className="flex flex-col gap-4 pt-4 pb-4">
          <Outlet />
        </div>
      </Card>
    </div>
  );
} 
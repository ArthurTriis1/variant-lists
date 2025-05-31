import { Outlet, useLocation, useResolvedPath } from "react-router";
import { Card } from "~/components/ui/card";

const pathMapper = {
  "/sign-in": "Sign-In",
  "/sign-up": "Sign-Up",
};

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-1" >
        <span className="text-2xl font-londrina">{pathMapper[location.pathname as keyof typeof pathMapper]}</span>
      </div>
      <Card className="w-full max-w-md p-8 flex flex-col gap-8 pt-8 pb-8 h-[calc(100vh-80px)] md:pt-16 md:pb-16 md:h-auto overflow-scroll">
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
import { Outlet, useLocation } from "react-router";
import { Card } from "~/components/ui/card";

const pathMapper = {
	"/sign-in": "Sign-In",
	"/sign-up": "Sign-Up",
};

export default function AuthLayout() {
	const location = useLocation();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4">
			<div className="mb-1 w-full max-w-md">
				<span className="font-londrina text-2xl">
					{pathMapper[location.pathname as keyof typeof pathMapper]}
				</span>
			</div>
			<Card className="flex h-[calc(100vh-80px)] w-full max-w-md flex-col gap-8 overflow-scroll p-8 pb-8 pt-8 md:h-auto md:pb-16 md:pt-16">
				<div className="flex flex-col items-center gap-8">
					<h1 className="text-center text-7xl font-bold">VARIANT LISTS</h1>
				</div>
				<div className="flex flex-col gap-4 pb-4 pt-4">
					<Outlet />
				</div>
			</Card>
		</div>
	);
}

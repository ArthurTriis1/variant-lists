import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import Link from "next/link";

export default function Signup() {
	return (
		<div className="w-[calc(100vw-80px)] sm:w-[400px]">
			<h1 className="text-center text-6xl uppercase">
				Variant <br /> Lists
			</h1>
			<Input
				className="mt-6"
				label="Email"
				type="Email"
				id="email"
				placeholder="email@gmail.com"
			/>
			<Input
				className="mt-6"
				label="Password"
				type="password"
				id="password"
				placeholder="Password"
			/>
			<Input
				className="mt-6"
				label="Confirm Password"
				type="password"
				id="confirm-password"
				placeholder="Confirm Password"
			/>

			<Button size="full" className="mt-8 capitalize">
				Subscribe
			</Button>

			<Button
				asChild
				size="full"
				variant="ghost"
				className="mt-8 capitalize"
			>
				<Link href="/signin">Sign-in</Link>
			</Button>
		</div>
	);
}

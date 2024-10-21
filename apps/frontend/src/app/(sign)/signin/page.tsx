import { InputText } from "@/components/Input/Input";

export default function Signin() {
	return (
		<div className=" h-[80vh] w-full sm:w-[400px]">
			<h1 className="text-center text-6xl uppercase">
				Variant <br /> Lists
			</h1>
			<InputText
				label="Email"
				type="Email"
				id="email"
				placeholder="email@gmail.com"
			/>
			<InputText
				label="Password"
				type="password"
				id="password"
				placeholder="Password"
			/>
			<InputText
				label="Confirm Password"
				type="password"
				id="confirm-password"
				placeholder="Confirm Password"
			/>
		</div>
	);
}

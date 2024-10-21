import { ReactNode } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type InputTextProps = {
	placeholder: string;
	label: string;
	type: string;
	id: string;
	icon?: ReactNode;
};

export const InputText = ({
	placeholder,
	label,
	type,
	id,
	icon,
}: InputTextProps) => {
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
			<Label className="font-light text-xl" htmlFor={id}>
				{label}
			</Label>
			<Input
				type={type}
				id={id}
				placeholder={placeholder}
				className="font-light border-4 rounded-2xl border-black drop-shadow-hard bg-white h-12 text-xl"
				icon={icon}
			/>
		</div>
	);
};

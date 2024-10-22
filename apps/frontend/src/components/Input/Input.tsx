import { ComponentProps, ReactNode } from "react";
import { Input as ShadcnInput } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export type InputTextProps = ComponentProps<"div"> & {
	placeholder: string;
	label: string;
	type: string;
	id: string;
	icon?: ReactNode;
};

export const Input = ({
	placeholder,
	label,
	type,
	id,
	icon,
	className,
	...otherProps
}: InputTextProps) => {
	return (
		<div
			className={cn("grid w-full items-center gap-1.5 mt-6", className)}
			{...otherProps}
		>
			<Label className="font-light text-xl" htmlFor={id}>
				{label}
			</Label>
			<ShadcnInput
				type={type}
				id={id}
				placeholder={placeholder}
				className="font-light border-4 rounded-2xl border-black drop-shadow-hard bg-white h-12 text-xl"
				icon={icon}
			/>
		</div>
	);
};

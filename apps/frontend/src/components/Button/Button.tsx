import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	`rounded-2xl bg-white h-12 text-xl py-3 px-4 
    inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors 
    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 
    [&_svg]:shrink-0`,
	{
		variants: {
			variant: {
				default:
					"bg-black text-primary-foreground border-4 border-black drop-shadow-hard",
				outline: "bg-background border-4 border-black drop-shadow-hard",
				ghost: "",
			},
			size: {
				default: "",
				full: "w-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };

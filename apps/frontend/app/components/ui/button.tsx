import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-[16px] text-[20px] font-londrina transition-colors bg-white",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/90  drop-shadow-custom",
        outline:
          "border-[4px] border-black bg-white text-black  drop-shadow-custom",
        ghost: "text-black bg-white",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5",
        lg: "px-[16px] py-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { PlusIcon } from "@phosphor-icons/react";

const headingVariants = cva(
  "group inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-[16px] text-[20px] font-londrina transition-colors bg-white relative border-[4px] border-black text-black  drop-shadow-custom",
  {
    variants: {
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5",
        lg: "px-[16px] py-[8px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

export interface HeadingProps
  extends React.ComponentPropsWithoutRef<"h2">,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  onPlusClick?: () => void;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, size, icon, level = 2, children, onPlusClick, ...props },
    ref
  ) => {
    const Comp = `h${level}` as unknown as React.ComponentType<any>;

    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ size, className }))}
        {...props}
      >
        {icon && <span className="inline-flex items-center">{icon}</span>}
        {children}
        {onPlusClick && (
          <button onClick={onPlusClick}>
            <PlusIcon
              weight="bold"
              className="ml-auto w-0 cursor-pointer  transition-[width] group-hover:w-6"
              size={24}
            />
          </button>
        )}
      </Comp>
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };

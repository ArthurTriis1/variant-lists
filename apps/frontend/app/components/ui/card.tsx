import * as React from "react";
import { cn } from "~/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  footerMessage?: string;
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, wrapperClassName, children, footerMessage, ...props }, ref) => {
    return (
      <div className={cn("relative", wrapperClassName)}>
        <div
          ref={ref}
          className={cn(
            "drop-shadow-custom rounded-[16px] border-[4px] border-black bg-white",
            footerMessage && "drop-shadow-error",
            className
          )}
          {...props}
        >
          {children}
        </div>
        {footerMessage && (
          <p
            title={footerMessage}
            className="text-white text-sm absolute -bottom-5 truncate left-0 w-[calc(100%-20px)] translate-x-[16px]"
          >
            {footerMessage}
          </p>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };

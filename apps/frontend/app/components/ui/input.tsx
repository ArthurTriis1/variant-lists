import * as React from "react"
import { cn } from "~/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "w-full rounded-[16px] border-[4px] border-black bg-white px-[16px] py-[8px] text-[20px] font-londrina text-gray-500 drop-shadow-custom",
            "placeholder:text-gray-500",
            "focus:outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute right-[16px] top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input } 
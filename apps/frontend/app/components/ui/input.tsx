import * as React from "react"
import { cn } from "~/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, children, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {children}
        <div className="relative w-full">
          <input
            type={type}
            className={cn(
              "w-full rounded-[16px] border-[4px] border-black bg-white px-[16px] py-[8px] text-[20px] font-londrina text-gray-500 mb-[20px]",
              error ? "drop-shadow-error" : "drop-shadow-custom",
              "placeholder:text-gray-500",
              "focus:outline-none",
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <div className="absolute right-[16px] top-1/2 -translate-y-[22px] text-gray-500">
              {icon}
            </div>
          )}
          {error && (
            <span title={error} className="bg-black text-[16px] font-londrina text-white absolute bottom-0 left-0 translate-x-[16px] w-[calc(100%-20px)] truncate whitespace-nowrap cursor-default">
              {error}
            </span>
          )}
        </div>
      </div>
    )
  }
)

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-[20px] font-londrina text-black",
        className
      )}
      {...props}
    />
  )
})

const Error = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) return null

  return (
    <p
      ref={ref}
      className={cn(
        "text-[16px] font-londrina text-red-500 mt-1",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
})

Input.displayName = "Input"
Label.displayName = "Input.Label"
Error.displayName = "Input.Error"

export { Input, Label as InputLabel, Error as InputError } 
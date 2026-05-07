import * as React from "react"
import { twMerge } from "tailwind-merge"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={() => onCheckedChange?.(!checked)}
    className={twMerge(
      "peer h-5 w-5 shrink-0 rounded-md border border-slate-700 bg-slate-950/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-indigo-600 border-indigo-600 text-white" : "text-transparent",
      className
    )}
    ref={ref}
    {...props}
  >
    <Check className="h-3.5 w-3.5 stroke-[3]" />
  </button>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }

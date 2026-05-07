import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }

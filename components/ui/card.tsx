"use client"

import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 shadow-sm ${className}`}
      {...props}
    />
  )
})
Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className = "", ...props }, ref) => {
  return <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
})
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

export const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className = "", ...props }, ref) => {
  return <p ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
})
CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = "", ...props }, ref) => {
    return <p ref={ref} className={`text-sm text-zinc-500 dark:text-zinc-400 ${className}`} {...props} />
  },
)
CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className = "", ...props }, ref) => {
  return <div ref={ref} className={`p-6 ${className}`} {...props} />
})
CardContent.displayName = "CardContent"

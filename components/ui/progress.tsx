"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"

interface ProgressProps extends ProgressPrimitive.Root.Props {
  trackClassName?: string
  indicatorClassName?: string
}

function Progress({
  className,
  children,
  value,
  trackClassName,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("w-full", className)}
      {...props}
    >
      {children ? (
        children
      ) : (
        <ProgressTrack className={trackClassName}>
          <ProgressIndicator className={indicatorClassName} />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  const hasBg = typeof className === "string" && className.includes("bg-")
  const hasHeight = typeof className === "string" && className.includes("h-")
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex w-full items-center overflow-x-hidden rounded-full",
        !hasBg && "bg-muted",
        !hasHeight && "h-1",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  const hasBg = typeof className === "string" && className.includes("bg-")
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full", !hasBg && "bg-primary", className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}

"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

const DialogRoot = Dialog.Root
const DialogTrigger = Dialog.Trigger
const DialogPortal = Dialog.Portal
const DialogClose = Dialog.Close

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    forceMount
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      "transition-opacity duration-150 ease-out will-change-[opacity]",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=closed]:pointer-events-none",
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = Dialog.Overlay.displayName

type DialogContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  showCloseButton?: boolean
}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  DialogContentProps
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogContentInner
    ref={ref}
    className={className}
    showCloseButton={showCloseButton}
    {...props}
  >
    {children}
  </DialogContentInner>
))
DialogContent.displayName = Dialog.Content.displayName

const DialogContentInner = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  DialogContentProps
>(({ className, children, showCloseButton = true, ...props }, ref) => {
  const tCommon = useTranslations("common")
  return (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Content
      forceMount
      ref={ref}
      className={cn(
        "fixed z-50 grid w-full gap-4 bg-card shadow-lg",
        "transition-[opacity,transform] duration-150 ease-out will-change-[transform,opacity]",
        "data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=closed]:pointer-events-none",
        // Mobile: slides up from bottom as a bottom sheet
        "bottom-0 left-0 right-0 rounded-t-2xl px-5 pb-8 pt-5 max-h-[92dvh] overflow-y-auto",
        "translate-y-0 data-[state=closed]:translate-y-1",
        // Desktop: centred dialog
        "sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
        "sm:rounded-xl sm:max-w-md sm:max-h-[90dvh]",
        "sm:data-[state=closed]:-translate-y-[calc(50%-4px)] sm:data-[state=open]:-translate-y-1/2",
        className,
      )}
      {...props}
    >
      {children}
        {showCloseButton ? (
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
            <X className="size-4" strokeWidth={2} aria-hidden />
            <span className="sr-only">{tCommon("close")}</span>
          </Dialog.Close>
        ) : null}
      </Dialog.Content>
    </DialogPortal>
  )
})
DialogContentInner.displayName = "DialogContentInner"

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 pr-6", className)} {...props} />
}
DialogHeader.displayName = "DialogHeader"

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("text-base font-semibold leading-tight text-foreground", className)}
      {...props}
    />
  )
}
DialogTitle.displayName = Dialog.Title.displayName

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
DialogDescription.displayName = Dialog.Description.displayName

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}

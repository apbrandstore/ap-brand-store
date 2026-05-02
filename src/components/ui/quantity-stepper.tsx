import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stepperBtnClass =
  "min-w-9 px-0 text-foreground hover:bg-card hover:text-primary [&_svg]:text-current";

type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  increaseLabel: string;
  decreaseLabel: string;
  className?: string;
  /** Bordered − / qty / + control for dense layouts (e.g. checkout) */
  layout?: "default" | "segmented";
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
};

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  increaseLabel,
  decreaseLabel,
  className,
  layout = "default",
  decrementDisabled = false,
  incrementDisabled = false,
}: QuantityStepperProps) {
  if (layout === "segmented") {
    const segmentBtn = (side: "left" | "right") =>
      cn(
        "flex h-10 w-10 shrink-0 items-center justify-center border-0 bg-card text-foreground transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent/60 [&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:stroke-[2.5]",
        side === "left" && "border-e border-border",
        decrementDisabled && side === "left"
          ? "cursor-not-allowed opacity-40"
          : !decrementDisabled && side === "left" && "cursor-pointer hover:bg-card active:bg-card/80",
        incrementDisabled && side === "right"
          ? "cursor-not-allowed opacity-40"
          : !incrementDisabled && side === "right" && "cursor-pointer hover:bg-card active:bg-card/80",
      );

    return (
      <div
        className={cn(
          "inline-flex select-none items-stretch overflow-hidden rounded-md border border-border bg-card text-foreground shadow-sm",
          className,
        )}
      >
        <button
          type="button"
          className={segmentBtn("left")}
          onClick={onDecrement}
          disabled={decrementDisabled}
          aria-label={decreaseLabel}
        >
          <Minus aria-hidden />
        </button>
        <span className="flex min-w-[2.75rem] items-center justify-center border-e border-black/10 bg-card px-2 tabular-nums text-sm font-medium text-foreground">
          {quantity}
        </span>
        <button
          type="button"
          className={segmentBtn("right")}
          onClick={onIncrement}
          disabled={incrementDisabled}
          aria-label={increaseLabel}
        >
          <Plus aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onDecrement}
        disabled={decrementDisabled}
        aria-label={decreaseLabel}
        className={stepperBtnClass}
      >
        <Minus className="size-4 shrink-0 stroke-[2.5]" aria-hidden />
      </Button>
      <span className="min-w-6 text-center text-sm font-medium tabular-nums text-foreground">{quantity}</span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onIncrement}
        disabled={incrementDisabled}
        aria-label={increaseLabel}
        className={stepperBtnClass}
      >
        <Plus className="size-4 shrink-0 stroke-[2.5]" aria-hidden />
      </Button>
    </div>
  );
}

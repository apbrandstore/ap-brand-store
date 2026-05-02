"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchButtonLabel: string;
  className?: string;
};

export function BlogSearch({ value, onChange, placeholder, searchButtonLabel, className }: BlogSearchProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-xl flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0 sm:overflow-hidden sm:rounded-lg sm:border sm:border-neutral-200 sm:bg-white sm:shadow-sm",
        className,
      )}
    >
      <label className="relative flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm sm:rounded-none sm:border-0 sm:shadow-none sm:py-0 sm:ps-4">
        <Search className="size-4 shrink-0 text-neutral-400" strokeWidth={2} aria-hidden />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-neutral-400"
          autoComplete="off"
          aria-label={placeholder}
        />
      </label>
      <Button
        type="button"
        variant="primary"
        size="md"
        className="w-full shrink-0 rounded-lg sm:w-auto sm:rounded-none sm:px-8"
        onClick={() => {
          /* filter is live on input; button for affordance / keyboard users */
        }}
      >
        {searchButtonLabel}
      </Button>
    </div>
  );
}

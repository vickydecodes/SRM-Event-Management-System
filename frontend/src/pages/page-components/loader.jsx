"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({ text = "Loading...", className }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm",
        className
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      {text && (
        <p className="mt-3 text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}


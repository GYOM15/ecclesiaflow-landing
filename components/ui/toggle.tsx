"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  options: [string, string];
  active: number;
  onChange: (index: number) => void;
  savingLabel?: string;
}

export function Toggle({ options, active, onChange, savingLabel }: ToggleProps) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative inline-flex items-center rounded-full bg-slate-100 p-1">
        <div
          className={cn(
            "absolute h-[calc(100%-8px)] rounded-full bg-white shadow-sm transition-all duration-300",
            active === 0
              ? "left-1 w-[calc(50%-4px)]"
              : "left-[calc(50%+2px)] w-[calc(50%-4px)]"
          )}
        />
        {options.map((option, i) => (
          <button
            key={option}
            onClick={() => onChange(i)}
            className={cn(
              "relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer",
              active === i
                ? "text-slate-900"
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {savingLabel && active === 1 && (
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          {savingLabel}
        </span>
      )}
    </div>
  );
}

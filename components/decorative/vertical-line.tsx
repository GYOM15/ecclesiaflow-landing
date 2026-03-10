"use client";

/**
 * Stripe-style vertical line that runs from top to bottom of the page.
 * Placed in the layout to create visual continuity.
 */
export function VerticalLine() {
  return (
    <div className="fixed left-[max(0.75rem,calc((100vw-80rem)/2+0.75rem))] top-0 bottom-0 w-[1.5px] z-[5] pointer-events-none hidden lg:block" aria-hidden="true">
      <div className="w-full h-full bg-gradient-to-b from-transparent via-slate-400/70 to-transparent" />
    </div>
  );
}

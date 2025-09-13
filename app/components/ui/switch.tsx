import * as React from "react";
import * as SwitchPr from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPr.Root> {
  checked?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPr.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPr.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "border-2 border-transparent bg-white/10 transition-colors data-[state=checked]:bg-white/70",
      className
    )}
    {...props}
  >
    <SwitchPr.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-slate-900 shadow-lg ring-0 transition-transform",
        "translate-x-0 data-[state=checked]:translate-x-5"
      )}
    />
  </SwitchPr.Root>
));
Switch.displayName = "Switch";

export { Switch };

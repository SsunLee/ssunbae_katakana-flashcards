import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../lib/utils";

const Select = SelectPrimitive.Root;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // 트리거 스타일
      "inline-flex w-full items-center justify-between rounded-md border border-white/10",
      "bg-white/5 px-3 py-2 text-sm text-white outline-none hover:bg-white/10",
      className
    )}
    {...props}
  />
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectValue = SelectPrimitive.Value;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      // Dialog(z-50) 위로 떠야 하므로 z를 높이고, 다크 테마 색 지정
      className={cn(
        "z-[70] min-w-[12rem] overflow-hidden rounded-md border border-white/10",
        "bg-slate-900 text-white shadow-lg",
        className
      )}
      {...props}
    >

      {/* 리스트 영역 */}
      <SelectPrimitive.Viewport className="max-h-72 overflow-y-auto p-1 touch-pan-y">
        {children}
      </SelectPrimitive.Viewport>


    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm text-white",
      "outline-none hover:bg-white/10 data-[state=checked]:bg-white/15",
      className
    )}
    {...props}
  >
    {/* ★ 라벨을 Value와 연결하려면 ItemText가 꼭 있어야 함 */}
    <SelectPrimitive.ItemText className="leading-none">
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };

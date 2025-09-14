// app/components/FuriBadge.tsx
import React from "react";

export default function FuriBadge({ reading }: { reading: string }) {
  return ( // -top-[1.35] 조절 가능
    <span
      className="
        pointer-events-none   /* 아래 툴팁 hover 방해 X */
        absolute -top-[1.35em] left-1/2 -translate-x-1/2
        text-[10px] md:text-xs leading-none
        px-1.5 py-0.5 rounded-md
        bg-white/15 border border-white/10 backdrop-blur
        whitespace-nowrap
      "
    >
      {reading}
    </span>
  );
}

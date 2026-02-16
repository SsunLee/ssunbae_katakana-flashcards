export const AVATAR_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#0ea5e9",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
] as const;

export const AVATAR_ICONS = [
  "bookOpen",
  "badgeDollarSign",
  "graduationCap",
  "pencil",
  "music",
  "popcorn",
  "palette",
  "heart",
  "globe",
  "plane",
  "wrench",
  "pawPrint",
  "briefcase",
  "camera",
  "coffee",
  "gamepad2",
  "headphones",
  "laptop",
  "leaf",
  "moon",
  "sparkles",
  "trophy",
  "utensils",
  "star",
  "bike",
  "dumbbell",
  "flaskConical",
  "mic",
  "scale",
  "shield",
  "brain",
  "gift",
] as const;

export type AvatarColor = (typeof AVATAR_COLORS)[number];
export type AvatarIconName = (typeof AVATAR_ICONS)[number];

export const DEFAULT_AVATAR_COLOR: AvatarColor = "#22c55e";
export const DEFAULT_AVATAR_ICON: AvatarIconName = "bookOpen";

export function isAvatarColor(value: string): value is AvatarColor {
  return (AVATAR_COLORS as readonly string[]).includes(value);
}

export function isAvatarIconName(value: string): value is AvatarIconName {
  return (AVATAR_ICONS as readonly string[]).includes(value);
}

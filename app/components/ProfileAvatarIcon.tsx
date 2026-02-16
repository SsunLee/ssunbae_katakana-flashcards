import type { ComponentType } from "react";
import type { AvatarIconName } from "@/app/constants/avatarOptions";
import {
  BadgeDollarSign,
  Bike,
  Brain,
  BookOpen,
  Briefcase,
  Camera,
  Coffee,
  Dumbbell,
  FlaskConical,
  Gamepad2,
  Gift,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Laptop,
  Leaf,
  Mic,
  Moon,
  Music,
  Palette,
  PawPrint,
  Pencil,
  Plane,
  Popcorn,
  Scale,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Utensils,
  Wrench,
  type LucideProps,
} from "lucide-react";

const ICON_MAP: Record<AvatarIconName, ComponentType<LucideProps>> = {
  bookOpen: BookOpen,
  badgeDollarSign: BadgeDollarSign,
  graduationCap: GraduationCap,
  pencil: Pencil,
  music: Music,
  popcorn: Popcorn,
  palette: Palette,
  heart: Heart,
  globe: Globe,
  plane: Plane,
  wrench: Wrench,
  pawPrint: PawPrint,
  briefcase: Briefcase,
  camera: Camera,
  coffee: Coffee,
  gamepad2: Gamepad2,
  headphones: Headphones,
  laptop: Laptop,
  leaf: Leaf,
  moon: Moon,
  sparkles: Sparkles,
  trophy: Trophy,
  utensils: Utensils,
  star: Star,
  bike: Bike,
  dumbbell: Dumbbell,
  flaskConical: FlaskConical,
  mic: Mic,
  scale: Scale,
  shield: Shield,
  brain: Brain,
  gift: Gift,
};

type Props = LucideProps & {
  icon: AvatarIconName;
};

export default function ProfileAvatarIcon({ icon, ...props }: Props) {
  const Icon = ICON_MAP[icon];
  return <Icon {...props} />;
}

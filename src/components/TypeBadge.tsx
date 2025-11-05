import { Badge } from "./ui/badge";

interface TypeBadgeProps {
  type: string;
  className?: string;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  normal: { bg: "bg-[#A8A878]", text: "text-white" },
  fire: { bg: "bg-[#F08030]", text: "text-white" },
  water: { bg: "bg-[#6890F0]", text: "text-white" },
  electric: { bg: "bg-[#F8D030]", text: "text-[#1E1E1E]" },
  grass: { bg: "bg-[#78C850]", text: "text-white" },
  ice: { bg: "bg-[#98D8D8]", text: "text-[#1E1E1E]" },
  fighting: { bg: "bg-[#C03028]", text: "text-white" },
  poison: { bg: "bg-[#A040A0]", text: "text-white" },
  ground: { bg: "bg-[#E0C068]", text: "text-[#1E1E1E]" },
  flying: { bg: "bg-[#A890F0]", text: "text-white" },
  psychic: { bg: "bg-[#F85888]", text: "text-white" },
  bug: { bg: "bg-[#A8B820]", text: "text-white" },
  rock: { bg: "bg-[#B8A038]", text: "text-white" },
  ghost: { bg: "bg-[#705898]", text: "text-white" },
  dragon: { bg: "bg-[#7038F8]", text: "text-white" },
  dark: { bg: "bg-[#705848]", text: "text-white" },
  steel: { bg: "bg-[#B8B8D0]", text: "text-[#1E1E1E]" },
  fairy: { bg: "bg-[#EE99AC]", text: "text-[#1E1E1E]" },
};

export function TypeBadge({ type, className = "" }: TypeBadgeProps) {
  const normalizedType = type.toLowerCase();
  const colors = typeColors[normalizedType] || { bg: "bg-gray-400", text: "text-white" };

  return (
    <Badge className={`${colors.bg} ${colors.text} border-0 ${className}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
}

import { Card } from "./ui/card";
import { TypeBadge } from "./TypeBadge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CardPokemonProps {
  id: number;
  name: string;
  types: string[];
  image: string;
  onClick?: () => void;
}

export function CardPokemon({ id, name, types, image, onClick }: CardPokemonProps) {
  return (
    <Card
      className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-border hover:border-accent group"
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-full aspect-square bg-gradient-to-br from-muted to-background rounded-lg flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-200">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
        
        <div className="w-full text-center space-y-2">
          <p className="text-muted-foreground text-sm">#{id.toString().padStart(3, '0')}</p>
          <h3 className="text-foreground capitalize">{name}</h3>
          
          <div className="flex gap-2 justify-center flex-wrap">
            {types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

import { TypeBadge } from "./TypeBadge";
import { X, Filter, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TypeFilterProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
}

const allTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy"
];

export function TypeFilter({ selectedType, onTypeSelect }: TypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeSelect = (type: string) => {
    onTypeSelect(selectedType === type ? null : type);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={selectedType ? "default" : "outline"} 
            className="gap-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <Filter className="w-4 h-4" />
            {selectedType ? (
              <span className="capitalize">Tipo: {selectedType}</span>
            ) : (
              "Filtrar por tipo"
            )}
            <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-4 animate-in fade-in-50 slide-in-from-top-2" align="center">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Selecione um tipo:</p>
              {selectedType && (
                <button
                  onClick={() => {
                    onTypeSelect(null);
                    setIsOpen(false);
                  }}
                  className="text-xs text-accent hover:underline"
                >
                  Limpar
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {allTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className={`transition-all duration-200 ${
                    selectedType === type 
                      ? "scale-105 ring-2 ring-accent ring-offset-2 ring-offset-background" 
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <TypeBadge type={type} />
                </button>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedType && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onTypeSelect(null)}
          className="gap-2 animate-in fade-in-50 slide-in-from-right-2"
        >
          <X className="w-4 h-4" />
          Limpar
        </Button>
      )}
    </div>
  );
}

import { useState } from "react";
import { Plus, X, Swords, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Pokemon, searchPokemon } from "../data/pokemonData";
import { CardPokemon } from "./CardPokemon";
import { TypeBadge } from "./TypeBadge";
import { TypeFilter } from "./TypeFilter";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type TeamMode = "pvp" | "raid";

interface TeamBuilderProps {
  pokemonList: Pokemon[];
}

export function TeamBuilder({ pokemonList }: TeamBuilderProps) {
  const [mode, setMode] = useState<TeamMode>("pvp");
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const maxTeamSize = mode === "pvp" ? 3 : 6;
  
  // Apply filters
  let filteredPokemon = pokemonList;
  if (searchQuery) {
    filteredPokemon = searchPokemon(searchQuery, filteredPokemon);
  }
  if (selectedType) {
    filteredPokemon = filteredPokemon.filter(pokemon => 
      pokemon.types.some(type => type.toLowerCase() === selectedType.toLowerCase())
    );
  }

  const addPokemon = (pokemon: Pokemon) => {
    if (team.length < maxTeamSize) {
      setTeam([...team, pokemon]);
      setIsDialogOpen(false);
      setSearchQuery("");
      setSelectedType(null);
    }
  };

  const removePokemon = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  const analyzeTeam = () => {
    if (team.length === 0) return null;

    const allWeaknesses: string[] = [];
    const allStrengths: string[] = [];

    team.forEach(pokemon => {
      allWeaknesses.push(...pokemon.weaknesses);
      allStrengths.push(...pokemon.strengths);
    });

    const weaknessCount: Record<string, number> = {};
    const strengthCount: Record<string, number> = {};

    allWeaknesses.forEach(type => {
      weaknessCount[type] = (weaknessCount[type] || 0) + 1;
    });

    allStrengths.forEach(type => {
      strengthCount[type] = (strengthCount[type] || 0) + 1;
    });

    const topWeaknesses = Object.entries(weaknessCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type]) => type);

    const topStrengths = Object.entries(strengthCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type]) => type);

    return { topWeaknesses, topStrengths };
  };

  const analysis = analyzeTeam();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 pb-12">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1>Monte seu Time Estratégico</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escolha seus Pokémon e analise as forças e fraquezas do seu time.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => {
                setMode("pvp");
                setTeam([]);
              }}
              variant={mode === "pvp" ? "default" : "outline"}
              className="gap-2"
            >
              <Swords className="w-4 h-4" />
              PVP (3 Pokémon)
            </Button>
            <Button
              onClick={() => {
                setMode("raid");
                setTeam([]);
              }}
              variant={mode === "raid" ? "default" : "outline"}
              className="gap-2"
            >
              <Users className="w-4 h-4" />
              Reide (6 Pokémon)
            </Button>
          </div>
        </div>

        <Card className="p-8">
          <h2 className="mb-6">Seu Time ({team.length}/{maxTeamSize})</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {team.map((pokemon, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-muted to-background rounded-lg p-4 border-2 border-border hover:border-accent transition-colors">
                  <button
                    onClick={() => removePokemon(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="aspect-square flex items-center justify-center mb-2">
                    <ImageWithFallback
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <p className="text-xs text-center capitalize truncate">{pokemon.name}</p>
                </div>
              </div>
            ))}

            {Array.from({ length: maxTeamSize - team.length }).map((_, index) => (
              <button
                key={`empty-${index}`}
                onClick={() => setIsDialogOpen(true)}
                className="aspect-square bg-muted hover:bg-muted/70 rounded-lg border-2 border-dashed border-border hover:border-accent transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent"
              >
                <Plus className="w-8 h-8" />
                <span className="text-xs">Adicionar</span>
              </button>
            ))}
          </div>

          {team.length === maxTeamSize && (
            <Button className="w-full" size="lg">
              Salvar Time
            </Button>
          )}
        </Card>

        {analysis && team.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h3>Seu time é forte contra</h3>
              </div>
              <div className="flex gap-2 flex-wrap">
                {analysis.topStrengths.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
              {analysis.topStrengths.length === 0 && (
                <p className="text-muted-foreground text-sm">Adicione mais Pokémon para ver análise</p>
              )}
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <h3>Seu time é vulnerável a</h3>
              </div>
              <div className="flex gap-2 flex-wrap">
                {analysis.topWeaknesses.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
              {analysis.topWeaknesses.length === 0 && (
                <p className="text-muted-foreground text-sm">Adicione mais Pokémon para ver análise</p>
              )}
            </Card>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Escolha um Pokémon</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Buscar Pokémon por nome, número ou tipo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />

            <div className="flex items-center justify-center">
              <TypeFilter 
                selectedType={selectedType}
                onTypeSelect={setSelectedType}
              />
            </div>

            {(searchQuery || selectedType) && (
              <p className="text-sm text-muted-foreground text-center">
                {filteredPokemon.length} Pokémon encontrado(s)
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPokemon.slice(0, 12).map((pokemon) => (
                <div
                  key={pokemon.id}
                  onClick={() => addPokemon(pokemon)}
                  className="cursor-pointer"
                >
                  <CardPokemon
                    id={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types}
                    image={pokemon.image}
                  />
                </div>
              ))}
            </div>

            {filteredPokemon.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Nenhum Pokémon encontrado.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

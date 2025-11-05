import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";
import { Pokemon } from "../data/pokemonData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onBack: () => void;
  onPokemonClick?: (id: number) => void;
  pokemonList: Pokemon[];
}

export function PokemonDetails({ pokemon, onBack, onPokemonClick, pokemonList }: PokemonDetailsProps) {
  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à Pokédex
        </Button>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 md:w-1/3">
              <div className="bg-gradient-to-br from-muted to-background rounded-xl p-8 aspect-square flex items-center justify-center">
                <ImageWithFallback
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <p className="text-muted-foreground mb-2">#{pokemon.id.toString().padStart(3, '0')}</p>
                <h1 className="capitalize mb-4">{pokemon.name}</h1>
                <div className="flex gap-2 flex-wrap">
                  {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{pokemon.description}</p>

              <div className="space-y-3">
                <h3>Estatísticas Base</h3>
                <StatBar label="Ataque" value={pokemon.stats.attack} maxValue={350} color="bg-red-500" />
                <StatBar label="Defesa" value={pokemon.stats.defense} maxValue={350} color="bg-blue-500" />
                <StatBar label="Stamina" value={pokemon.stats.stamina} maxValue={350} color="bg-green-500" />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="mb-4">Fast Moves</h3>
            <div className="space-y-2">
              {pokemon.fastMoves.map((move) => (
                <div key={move} className="px-4 py-2 bg-muted rounded-lg">
                  {move}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Charged Moves</h3>
            <div className="space-y-2">
              {pokemon.chargedMoves.map((move) => (
                <div key={move} className="px-4 py-2 bg-muted rounded-lg">
                  {move}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="mb-4">Forte contra</h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.strengths.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Fraco contra</h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.weaknesses.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </Card>
        </div>

        {pokemon.evolution && (
          <Card className="p-6">
            <h3 className="mb-6">Linha Evolutiva</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {pokemon.evolution.prevId && (
                <div
                  className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => onPokemonClick?.(pokemon.evolution.prevId!)}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-muted to-background rounded-lg p-3 flex items-center justify-center">
                    <ImageWithFallback
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.evolution.prevId}.png`}
                      alt={pokemon.evolution.prevName || ''}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm capitalize">{pokemon.evolution.prevName}</p>
                </div>
              )}

              {pokemon.evolution.prevId && pokemon.evolution.nextId && (
                <div className="text-2xl text-muted-foreground">→</div>
              )}

              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg p-4 flex items-center justify-center border-2 border-accent">
                  <ImageWithFallback
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="capitalize">{pokemon.name}</p>
              </div>

              {pokemon.evolution.nextId && (
                <>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div
                    className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={() => onPokemonClick?.(pokemon.evolution.nextId!)}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-muted to-background rounded-lg p-3 flex items-center justify-center">
                      <ImageWithFallback
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.evolution.nextId}.png`}
                        alt={pokemon.evolution.nextName || ''}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm capitalize">{pokemon.evolution.nextName}</p>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

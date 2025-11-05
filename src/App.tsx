import { useState, useEffect } from "react";
import { Search, Moon, Sun, Loader2 } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { CardPokemon } from "./components/CardPokemon";
import { PokemonDetails } from "./components/PokemonDetails";
import { ItemsGuide } from "./components/ItemsGuide";
import { TeamBuilder } from "./components/TeamBuilder";
import { TypeFilter } from "./components/TypeFilter";
import { fetchAllGen1Pokemon, searchPokemon, getPokemonById, Pokemon } from "./data/pokemonData";

type Page = "home" | "details" | "items" | "team";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    setIsLoading(true);
    setLoadingProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 1, 95));
      }, 100);

      const pokemon = await fetchAllGen1Pokemon();
      
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setPokemonList(pokemon);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error loading Pokemon:', error);
      setIsLoading(false);
    }
  };

  // Apply filters
  let filteredPokemon = pokemonList;
  
  // Filter by search query
  if (searchQuery) {
    filteredPokemon = searchPokemon(searchQuery, filteredPokemon);
  }
  
  // Filter by type
  if (selectedType) {
    filteredPokemon = filteredPokemon.filter(pokemon => 
      pokemon.types.some(type => type.toLowerCase() === selectedType.toLowerCase())
    );
  }
  
  const selectedPokemon = selectedPokemonId ? getPokemonById(selectedPokemonId, pokemonList) : null;

  const handlePokemonClick = (id: number) => {
    setSelectedPokemonId(id);
    setCurrentPage("details");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedPokemonId(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto animate-bounce">
            <span className="text-6xl">⚡</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-foreground">Carregando Pokédex...</h2>
            <p className="text-muted-foreground text-sm">
              Buscando {loadingProgress < 100 ? 'todos os' : ''} 151 Pokémon da primeira geração
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-muted-foreground text-sm">{loadingProgress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h1 className="text-primary-foreground">PokéGoHelper</h1>
                  <p className="text-xs text-primary-foreground/70">{pokemonList.length} Pokémon disponíveis</p>
                </div>
              </div>

              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>

            <nav className="flex gap-2 flex-wrap">
              <Button
                onClick={() => setCurrentPage("home")}
                variant={currentPage === "home" ? "secondary" : "ghost"}
                className={currentPage === "home" ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}
              >
                Pokédex
              </Button>
              <Button
                onClick={() => setCurrentPage("items")}
                variant={currentPage === "items" ? "secondary" : "ghost"}
                className={currentPage === "items" ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}
              >
                Itens
              </Button>
              <Button
                onClick={() => setCurrentPage("team")}
                variant={currentPage === "team" ? "secondary" : "ghost"}
                className={currentPage === "team" ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}
              >
                Team Builder
              </Button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        {currentPage === "home" && (
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 pb-12">
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar Pokémon por nome, número ou tipo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-6 text-lg bg-card border-border shadow-md"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="max-w-5xl mx-auto">
                <TypeFilter 
                  selectedType={selectedType}
                  onTypeSelect={setSelectedType}
                />
              </div>

              {/* Results Count */}
              {(searchQuery || selectedType) && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <p className="text-sm">
                      {filteredPokemon.length} Pokémon encontrado(s)
                      {selectedType && (
                        <span className="ml-1 capitalize">
                          · Tipo: <span className="font-medium">{selectedType}</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Pokemon Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPokemon.map((pokemon) => (
                  <CardPokemon
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types}
                    image={pokemon.image}
                    onClick={() => handlePokemonClick(pokemon.id)}
                  />
                ))}
              </div>

              {filteredPokemon.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    Nenhum Pokémon encontrado.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedType(null);
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Limpar busca
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentPage === "details" && selectedPokemon && (
          <PokemonDetails
            pokemon={selectedPokemon}
            onBack={handleBackToHome}
            onPokemonClick={handlePokemonClick}
            pokemonList={pokemonList}
          />
        )}

        {currentPage === "items" && <ItemsGuide />}

        {currentPage === "team" && <TeamBuilder pokemonList={pokemonList} />}

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm opacity-90">
              Pokédex Interativa - Pokémon GO Companion
            </p>
            <p className="text-xs opacity-70 mt-2">
              Dados obtidos da PokéAPI. Pokémon e Pokémon GO são marcas registradas da Nintendo, Game Freak e The Pokémon Company.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

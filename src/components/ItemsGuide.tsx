import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getAllItems, getItemsByCategory, searchItems, itemCategories, Item } from "../data/itemsData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ItemsGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allItems = getAllItems();
  
  // Apply filters
  let filteredItems = allItems;
  if (searchQuery) {
    filteredItems = searchItems(searchQuery, filteredItems);
  }
  if (selectedCategory) {
    filteredItems = getItemsByCategory(selectedCategory);
    if (searchQuery) {
      filteredItems = searchItems(searchQuery, filteredItems);
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setIsFilterOpen(false);
  };

  const getCategoryInfo = (categoryName: string) => {
    return itemCategories.find(cat => cat.name === categoryName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-3">
          <h1>Guia de Itens</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça todos os itens do Pokémon GO e aprenda a usá-los estrategicamente.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar itens por nome ou descrição..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-card border-border shadow-md"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={selectedCategory ? "default" : "outline"} 
                  className="gap-2 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <Filter className="w-4 h-4" />
                  {selectedCategory ? (
                    <>
                      {getCategoryInfo(selectedCategory)?.icon}
                      <span className="capitalize ml-1">
                        {getCategoryInfo(selectedCategory)?.description.split(' ')[0]}
                      </span>
                    </>
                  ) : (
                    "Filtrar por categoria"
                  )}
                  <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                  {selectedCategory && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {filteredItems.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4 animate-in fade-in-50 slide-in-from-top-2" align="center">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Selecione uma categoria:</p>
                    {selectedCategory && (
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setIsFilterOpen(false);
                        }}
                        className="text-xs text-accent hover:underline"
                      >
                        Limpar
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-1">
                    {itemCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                          selectedCategory === category.name
                            ? "border-accent bg-accent/10 scale-105"
                            : "border-border hover:border-accent/50 hover:bg-muted"
                        }`}
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{category.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {getItemsByCategory(category.name).length} itens
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedCategory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="gap-2 animate-in fade-in-50 slide-in-from-right-2"
              >
                <span className="hidden sm:inline">Limpar filtro</span>
                <span className="sm:hidden">Limpar</span>
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || selectedCategory) && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <p className="text-sm">
                {filteredItems.length} item(ns) encontrado(s)
              </p>
            </div>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const categoryInfo = getCategoryInfo(item.category);
            return (
              <Card 
                key={item.id} 
                className="group hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-20 h-20 bg-gradient-to-br from-muted to-background rounded-xl p-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <span>{categoryInfo?.icon}</span>
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.effect && (
                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <p className="text-xs text-accent font-medium">{item.effect}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum item encontrado.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              variant="outline"
              className="mt-4"
            >
              Limpar filtros
            </Button>
          </div>
        )}

        {/* Categories Overview */}
        {!searchQuery && !selectedCategory && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-center mb-6">Categorias de Itens</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {itemCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all group"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                    <p className="text-xs font-medium mt-1">
                      {getItemsByCategory(category.name).length} itens
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        {!searchQuery && !selectedCategory && (
          <Card className="mt-8 p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <div className="text-center space-y-4">
              <h3>💡 Dicas de Uso</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2">
                  <p className="font-medium">🎯 Captura Eficiente</p>
                  <p className="text-sm text-muted-foreground">
                    Use Razz Berry para Pokémon difíceis e reserve Ultra Balls para capturas importantes.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">💎 Maximize Recursos</p>
                  <p className="text-sm text-muted-foreground">
                    Use Pinap Berry em Pokémon fáceis de capturar para dobrar os doces recebidos.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">⚡ Evolução Estratégica</p>
                  <p className="text-sm text-muted-foreground">
                    Planeje o uso de itens de evolução especiais - alguns Pokémon só evoluem com eles.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

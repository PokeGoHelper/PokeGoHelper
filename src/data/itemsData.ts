export interface Item {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  effect?: string;
}

export interface ItemCategory {
  name: string;
  description: string;
  icon: string;
}

export const itemCategories: ItemCategory[] = [
  {
    name: "pokeballs",
    description: "Itens para capturar Pokémon",
    icon: "⚾"
  },
  {
    name: "potions",
    description: "Itens de cura e restauração",
    icon: "🧪"
  },
  {
    name: "revives",
    description: "Itens para reviver Pokémon",
    icon: "💫"
  },
  {
    name: "berries",
    description: "Frutas para ajudar na captura",
    icon: "🍓"
  },
  {
    name: "evolution",
    description: "Itens de evolução especial",
    icon: "💎"
  },
  {
    name: "battle",
    description: "Itens para batalhas",
    icon: "⚔️"
  },
  {
    name: "special",
    description: "Itens especiais e raros",
    icon: "✨"
  }
];

// Mapping PokeAPI items to Pokemon GO categories
const pokeAPIToCategory: Record<string, string> = {
  // Pokeballs
  "poke-ball": "pokeballs",
  "great-ball": "pokeballs",
  "ultra-ball": "pokeballs",
  "master-ball": "pokeballs",
  "premier-ball": "pokeballs",
  
  // Potions
  "potion": "potions",
  "super-potion": "potions",
  "hyper-potion": "potions",
  "max-potion": "potions",
  
  // Revives
  "revive": "revives",
  "max-revive": "revives",
  
  // Berries
  "razz-berry": "berries",
  "bluk-berry": "berries",
  "nanab-berry": "berries",
  "pinap-berry": "berries",
  "golden-razz-berry": "berries",
  "silver-pinap-berry": "berries",
  
  // Evolution items
  "sun-stone": "evolution",
  "moon-stone": "evolution",
  "fire-stone": "evolution",
  "water-stone": "evolution",
  "thunder-stone": "evolution",
  "leaf-stone": "evolution",
  "kings-rock": "evolution",
  "metal-coat": "evolution",
  "dragon-scale": "evolution",
  "up-grade": "evolution",
  "dubious-disc": "evolution",
  "protector": "evolution",
  "electirizer": "evolution",
  "magmarizer": "evolution",
  "reaper-cloth": "evolution",
  "oval-stone": "evolution",
  "dawn-stone": "evolution",
  "dusk-stone": "evolution",
  "shiny-stone": "evolution",
  "sinnoh-stone": "evolution",
  "unova-stone": "evolution",
  
  // Battle items
  "lucky-egg": "battle",
  "star-piece": "battle",
  "incense": "battle",
  "lure-module": "battle",
  
  // Special
  "rare-candy": "special",
  "fast-tm": "special",
  "charged-tm": "special",
  "elite-fast-tm": "special",
  "elite-charged-tm": "special"
};

const pokeGoSpecificItems: Item[] = [
  {
    id: 10001,
    name: "Poké Ball",
    category: "pokeballs",
    description: "Uma esfera usada para capturar Pokémon selvagens.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
    effect: "Taxa básica de captura"
  },
  {
    id: 10002,
    name: "Great Ball",
    category: "pokeballs",
    description: "Uma esfera de alta performance com maior taxa de captura.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
    effect: "Taxa de captura aumentada"
  },
  {
    id: 10003,
    name: "Ultra Ball",
    category: "pokeballs",
    description: "Uma esfera ultra de alto desempenho para capturas difíceis.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
    effect: "Taxa de captura muito aumentada"
  },
  {
    id: 10004,
    name: "Premier Ball",
    category: "pokeballs",
    description: "Uma Poké Ball especial de edição limitada.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
    effect: "Taxa básica de captura (item especial)"
  },
  {
    id: 10005,
    name: "Potion",
    category: "potions",
    description: "Restaura 20 HP de um Pokémon.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png",
    effect: "Restaura 20 HP"
  },
  {
    id: 10006,
    name: "Super Potion",
    category: "potions",
    description: "Restaura 50 HP de um Pokémon.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png",
    effect: "Restaura 50 HP"
  },
  {
    id: 10007,
    name: "Hyper Potion",
    category: "potions",
    description: "Restaura 200 HP de um Pokémon.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png",
    effect: "Restaura 200 HP"
  },
  {
    id: 10008,
    name: "Max Potion",
    category: "potions",
    description: "Restaura completamente o HP de um Pokémon.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-potion.png",
    effect: "Restaura HP completo"
  },
  {
    id: 10009,
    name: "Revive",
    category: "revives",
    description: "Revive um Pokémon desmaiado com metade do HP.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/revive.png",
    effect: "Revive com 50% HP"
  },
  {
    id: 10010,
    name: "Max Revive",
    category: "revives",
    description: "Revive um Pokémon desmaiado com HP completo.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png",
    effect: "Revive com 100% HP"
  },
  {
    id: 10011,
    name: "Razz Berry",
    category: "berries",
    description: "Alimenta um Pokémon selvagem facilitando sua captura.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/razz-berry.png",
    effect: "Facilita captura"
  },
  {
    id: 10012,
    name: "Nanab Berry",
    category: "berries",
    description: "Acalma um Pokémon selvagem, reduzindo seus movimentos.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/nanab-berry.png",
    effect: "Reduz movimentos"
  },
  {
    id: 10013,
    name: "Pinap Berry",
    category: "berries",
    description: "Dobra os doces recebidos ao capturar um Pokémon.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pinap-berry.png",
    effect: "Dobra doces"
  },
  {
    id: 10014,
    name: "Golden Razz Berry",
    category: "berries",
    description: "Muito efetiva para facilitar capturas e motivar Pokémon em ginásios.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/golden-razz-berry.png",
    effect: "Facilita muito a captura"
  },
  {
    id: 10015,
    name: "Silver Pinap Berry",
    category: "berries",
    description: "Facilita capturas e aumenta doces recebidos.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/silver-pinap-berry.png",
    effect: "Facilita captura + mais doces"
  },
  {
    id: 10016,
    name: "Sun Stone",
    category: "evolution",
    description: "Faz certos Pokémon evoluírem quando expostos à luz solar.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sun-stone.png",
    effect: "Evolui Gloom, Sunkern"
  },
  {
    id: 10017,
    name: "King's Rock",
    category: "evolution",
    description: "Um item que faz certos Pokémon evoluírem.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/kings-rock.png",
    effect: "Evolui Poliwhirl, Slowpoke"
  },
  {
    id: 10018,
    name: "Metal Coat",
    category: "evolution",
    description: "Um revestimento metálico especial usado para evolução.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/metal-coat.png",
    effect: "Evolui Onix, Scyther"
  },
  {
    id: 10019,
    name: "Dragon Scale",
    category: "evolution",
    description: "Uma escama grossa e dura usada para evolução.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dragon-scale.png",
    effect: "Evolui Seadra"
  },
  {
    id: 10020,
    name: "Up-Grade",
    category: "evolution",
    description: "Um dispositivo transparente para evolução de Porygon.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/up-grade.png",
    effect: "Evolui Porygon"
  },
  {
    id: 10021,
    name: "Sinnoh Stone",
    category: "evolution",
    description: "Uma pedra misteriosa que faz certos Pokémon evoluírem.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sun-stone.png",
    effect: "Evolui vários Pokémon"
  },
  {
    id: 10022,
    name: "Unova Stone",
    category: "evolution",
    description: "Uma pedra peculiar que faz certos Pokémon evoluírem.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/moon-stone.png",
    effect: "Evolui vários Pokémon"
  },
  {
    id: 10023,
    name: "Lucky Egg",
    category: "battle",
    description: "Dobra os pontos de experiência ganhos por 30 minutos.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lucky-egg.png",
    effect: "2x XP por 30 min"
  },
  {
    id: 10024,
    name: "Star Piece",
    category: "battle",
    description: "Aumenta em 50% o Stardust ganho por 30 minutos.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/star-piece.png",
    effect: "1.5x Stardust por 30 min"
  },
  {
    id: 10025,
    name: "Incense",
    category: "battle",
    description: "Atrai Pokémon selvagens para sua localização por 60 minutos.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rage-candy-bar.png",
    effect: "Atrai Pokémon por 60 min"
  },
  {
    id: 10026,
    name: "Lure Module",
    category: "battle",
    description: "Um módulo que atrai Pokémon para uma PokéStop por 30 minutos.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oval-stone.png",
    effect: "Atrai Pokémon para PokéStop"
  },
  {
    id: 10027,
    name: "Rare Candy",
    category: "special",
    description: "Um doce misterioso que pode ser convertido em doce de qualquer Pokémon.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png",
    effect: "Converte em doce específico"
  },
  {
    id: 10028,
    name: "Fast TM",
    category: "special",
    description: "Uma máquina técnica que ensina um novo Fast Move aleatório.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png",
    effect: "Muda Fast Move"
  },
  {
    id: 10029,
    name: "Charged TM",
    category: "special",
    description: "Uma máquina técnica que ensina um novo Charged Move aleatório.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png",
    effect: "Muda Charged Move"
  },
  {
    id: 10030,
    name: "Elite Fast TM",
    category: "special",
    description: "Uma TM especial que permite escolher qualquer Fast Move.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png",
    effect: "Escolhe Fast Move"
  },
  {
    id: 10031,
    name: "Elite Charged TM",
    category: "special",
    description: "Uma TM especial que permite escolher qualquer Charged Move.",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png",
    effect: "Escolhe Charged Move"
  }
];

export function getItemsByCategory(category: string): Item[] {
  return pokeGoSpecificItems.filter(item => item.category === category);
}

export function searchItems(query: string, items: Item[] = pokeGoSpecificItems): Item[] {
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery)
  );
}

export function getAllItems(): Item[] {
  return pokeGoSpecificItems;
}

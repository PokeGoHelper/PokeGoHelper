export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  description: string;
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
  fastMoves: string[];
  chargedMoves: string[];
  evolution?: {
    prevName?: string;
    prevId?: number;
    nextName?: string;
    nextId?: number;
  };
  weaknesses: string[];
  strengths: string[];
}

// Type effectiveness chart
const typeEffectiveness: Record<string, { weakTo: string[]; strongAgainst: string[] }> = {
  normal: { weakTo: ['fighting'], strongAgainst: [] },
  fire: { weakTo: ['water', 'ground', 'rock'], strongAgainst: ['grass', 'ice', 'bug', 'steel'] },
  water: { weakTo: ['electric', 'grass'], strongAgainst: ['fire', 'ground', 'rock'] },
  electric: { weakTo: ['ground'], strongAgainst: ['water', 'flying'] },
  grass: { weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'], strongAgainst: ['water', 'ground', 'rock'] },
  ice: { weakTo: ['fire', 'fighting', 'rock', 'steel'], strongAgainst: ['grass', 'ground', 'flying', 'dragon'] },
  fighting: { weakTo: ['flying', 'psychic', 'fairy'], strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'] },
  poison: { weakTo: ['ground', 'psychic'], strongAgainst: ['grass', 'fairy'] },
  ground: { weakTo: ['water', 'grass', 'ice'], strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'] },
  flying: { weakTo: ['electric', 'ice', 'rock'], strongAgainst: ['grass', 'fighting', 'bug'] },
  psychic: { weakTo: ['bug', 'ghost', 'dark'], strongAgainst: ['fighting', 'poison'] },
  bug: { weakTo: ['fire', 'flying', 'rock'], strongAgainst: ['grass', 'psychic', 'dark'] },
  rock: { weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'], strongAgainst: ['fire', 'ice', 'flying', 'bug'] },
  ghost: { weakTo: ['ghost', 'dark'], strongAgainst: ['psychic', 'ghost'] },
  dragon: { weakTo: ['ice', 'dragon', 'fairy'], strongAgainst: ['dragon'] },
  dark: { weakTo: ['fighting', 'bug', 'fairy'], strongAgainst: ['psychic', 'ghost'] },
  steel: { weakTo: ['fire', 'fighting', 'ground'], strongAgainst: ['ice', 'rock', 'fairy'] },
  fairy: { weakTo: ['poison', 'steel'], strongAgainst: ['fighting', 'dragon', 'dark'] },
};

function getTypeEffectiveness(types: string[]): { weaknesses: string[]; strengths: string[] } {
  const weaknesses = new Set<string>();
  const strengths = new Set<string>();

  types.forEach(type => {
    const effectiveness = typeEffectiveness[type.toLowerCase()];
    if (effectiveness) {
      effectiveness.weakTo.forEach(w => weaknesses.add(w));
      effectiveness.strongAgainst.forEach(s => strengths.add(s));
    }
  });

  return {
    weaknesses: Array.from(weaknesses),
    strengths: Array.from(strengths)
  };
}

// Portuguese flavor text extraction
function getPortugueseDescription(flavorTextEntries: any[]): string {
  // Try to find Portuguese description first
  const ptEntry = flavorTextEntries.find((entry: any) => 
    entry.language.name === 'pt' || entry.language.name === 'pt-BR'
  );
  
  if (ptEntry) {
    return ptEntry.flavor_text.replace(/\n|\f/g, ' ');
  }

  // Fallback to English
  const enEntry = flavorTextEntries.find((entry: any) => entry.language.name === 'en');
  if (enEntry) {
    return enEntry.flavor_text.replace(/\n|\f/g, ' ');
  }

  return 'Um Pokémon misterioso.';
}

// Get evolution chain
async function getEvolutionChain(speciesUrl: string): Promise<any> {
  try {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();
    
    return evolutionData.chain;
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    return null;
  }
}

function extractEvolutionInfo(chain: any, currentName: string): { prevName?: string; prevId?: number; nextName?: string; nextId?: number } | undefined {
  if (!chain) return undefined;

  const findInChain = (node: any, parent: any = null): any => {
    if (node.species.name === currentName) {
      const result: any = {};
      
      // Previous evolution
      if (parent) {
        result.prevName = parent.species.name;
        result.prevId = parseInt(parent.species.url.split('/').slice(-2, -1)[0]);
      }
      
      // Next evolution
      if (node.evolves_to && node.evolves_to.length > 0) {
        result.nextName = node.evolves_to[0].species.name;
        result.nextId = parseInt(node.evolves_to[0].species.url.split('/').slice(-2, -1)[0]);
      }
      
      return Object.keys(result).length > 0 ? result : undefined;
    }
    
    for (const evolution of node.evolves_to) {
      const found = findInChain(evolution, node);
      if (found) return found;
    }
    
    return null;
  };

  return findInChain(chain);
}

// Convert PokeAPI stats to Pokemon GO stats (simplified conversion)
function convertToGoStats(stats: any[]): { attack: number; defense: number; stamina: number } {
  const baseStats = {
    hp: stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
    attack: stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
    defense: stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
    spAttack: stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
    spDefense: stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
    speed: stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
  };

  // Simplified Pokemon GO stat conversion
  const attack = Math.round(Math.max(baseStats.attack, baseStats.spAttack) * 1.8 + baseStats.speed * 0.25);
  const defense = Math.round(Math.max(baseStats.defense, baseStats.spDefense) * 1.8 + baseStats.speed * 0.25);
  const stamina = Math.round(baseStats.hp * 2);

  return { attack, defense, stamina };
}

// Mock moves (would need Pokemon GO specific API for real data)
function getMockMoves(types: string[]): { fastMoves: string[]; chargedMoves: string[] } {
  const movesByType: Record<string, { fast: string[]; charged: string[] }> = {
    normal: { fast: ['Tackle', 'Scratch'], charged: ['Body Slam', 'Hyper Beam'] },
    fire: { fast: ['Ember', 'Fire Spin'], charged: ['Flamethrower', 'Fire Blast', 'Overheat'] },
    water: { fast: ['Water Gun', 'Bubble'], charged: ['Aqua Tail', 'Hydro Pump', 'Surf'] },
    electric: { fast: ['Thunder Shock', 'Spark'], charged: ['Thunderbolt', 'Thunder', 'Discharge'] },
    grass: { fast: ['Vine Whip', 'Razor Leaf'], charged: ['Solar Beam', 'Seed Bomb', 'Power Whip'] },
    ice: { fast: ['Frost Breath', 'Ice Shard'], charged: ['Ice Beam', 'Blizzard', 'Avalanche'] },
    fighting: { fast: ['Low Kick', 'Counter'], charged: ['Close Combat', 'Dynamic Punch', 'Brick Break'] },
    poison: { fast: ['Poison Sting', 'Acid'], charged: ['Sludge Bomb', 'Gunk Shot', 'Poison Fang'] },
    ground: { fast: ['Mud Shot', 'Mud Slap'], charged: ['Earthquake', 'Dig', 'Earth Power'] },
    flying: { fast: ['Wing Attack', 'Air Slash'], charged: ['Hurricane', 'Aerial Ace', 'Sky Attack'] },
    psychic: { fast: ['Confusion', 'Psycho Cut'], charged: ['Psychic', 'Psyshock', 'Future Sight'] },
    bug: { fast: ['Bug Bite', 'Struggle Bug'], charged: ['Bug Buzz', 'X-Scissor', 'Signal Beam'] },
    rock: { fast: ['Rock Throw', 'Smack Down'], charged: ['Rock Slide', 'Stone Edge', 'Rock Blast'] },
    ghost: { fast: ['Lick', 'Shadow Claw'], charged: ['Shadow Ball', 'Shadow Punch', 'Ominous Wind'] },
    dragon: { fast: ['Dragon Breath', 'Dragon Tail'], charged: ['Dragon Claw', 'Outrage', 'Draco Meteor'] },
    dark: { fast: ['Bite', 'Snarl'], charged: ['Dark Pulse', 'Foul Play', 'Crunch'] },
    steel: { fast: ['Metal Claw', 'Bullet Punch'], charged: ['Flash Cannon', 'Iron Head', 'Heavy Slam'] },
    fairy: { fast: ['Charm', 'Fairy Wind'], charged: ['Dazzling Gleam', 'Moonblast', 'Play Rough'] },
  };

  const primaryType = types[0].toLowerCase();
  const moves = movesByType[primaryType] || movesByType.normal;

  return {
    fastMoves: moves.fast,
    chargedMoves: moves.charged
  };
}

export async function fetchPokemonFromAPI(id: number): Promise<Pokemon> {
  try {
    // Fetch Pokemon data
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await pokemonResponse.json();

    // Fetch species data for description and evolution
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();

    // Get types
    const types = pokemonData.types.map((t: any) => t.type.name);

    // Get type effectiveness
    const { weaknesses, strengths } = getTypeEffectiveness(types);

    // Get description
    const description = getPortugueseDescription(speciesData.flavor_text_entries);

    // Get evolution chain
    const evolutionChain = await getEvolutionChain(pokemonData.species.url);
    const evolution = extractEvolutionInfo(evolutionChain, pokemonData.name);

    // Convert stats
    const stats = convertToGoStats(pokemonData.stats);

    // Get moves
    const { fastMoves, chargedMoves } = getMockMoves(types);

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      types,
      image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
      description,
      stats,
      fastMoves,
      chargedMoves,
      evolution,
      weaknesses,
      strengths
    };
  } catch (error) {
    console.error(`Error fetching Pokemon ${id}:`, error);
    throw error;
  }
}

export async function fetchAllGen1Pokemon(): Promise<Pokemon[]> {
  const pokemon: Pokemon[] = [];
  const promises: Promise<Pokemon>[] = [];

  // Fetch all 151 Gen 1 Pokemon
  for (let i = 1; i <= 151; i++) {
    promises.push(fetchPokemonFromAPI(i));
  }

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching Gen 1 Pokemon:', error);
    return [];
  }
}

export function getPokemonById(id: number, pokemonList: Pokemon[]): Pokemon | undefined {
  return pokemonList.find(p => p.id === id);
}

export function searchPokemon(query: string, pokemonList: Pokemon[]): Pokemon[] {
  const lowerQuery = query.toLowerCase();
  return pokemonList.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.id.toString().includes(lowerQuery) ||
    p.types.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

// Datos necesarios para las fichas, tomados de la Pokédex de referencia del curso.
export const pokedex = [
  { id: 1, nombre: 'Bulbasaur', slug: 'bulbasaur', tipos: ['planta', 'veneno'] },
  { id: 2, nombre: 'Ivysaur', slug: 'ivysaur', tipos: ['planta', 'veneno'] },
  { id: 3, nombre: 'Venusaur', slug: 'venusaur', tipos: ['planta', 'veneno'] },
  { id: 4, nombre: 'Charmander', slug: 'charmander', tipos: ['fuego'] },
  { id: 5, nombre: 'Charmeleon', slug: 'charmeleon', tipos: ['fuego'] },
  { id: 6, nombre: 'Charizard', slug: 'charizard', tipos: ['fuego', 'volador'] },
  { id: 7, nombre: 'Squirtle', slug: 'squirtle', tipos: ['agua'] },
  { id: 8, nombre: 'Wartortle', slug: 'wartortle', tipos: ['agua'] },
  { id: 9, nombre: 'Blastoise', slug: 'blastoise', tipos: ['agua'] },
  { id: 25, nombre: 'Pikachu', slug: 'pikachu', tipos: ['electrico'] },
];

export function buscarPorId(id) {
  return pokedex.find((pokemon) => pokemon.id === id);
}

export function numeroPokedex(id) {
  return '#' + String(id).padStart(3, '0');
}

import { buscarPorId, numeroPokedex } from './datos.js';
import { listaFavoritos, quitarFavorito } from './favoritos.js';

const nombresTipos = {
  planta: 'Planta',
  veneno: 'Veneno',
  fuego: 'Fuego',
  volador: 'Volador',
  agua: 'Agua',
  electrico: 'Eléctrico',
};

export function pintarFavoritos() {
  const lista = document.querySelector('#favoritos .favoritos');
  if (!lista) return;

  const favoritos = listaFavoritos()
    .map(buscarPorId)
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  // Los textos y rutas de las fichas provienen del catálogo local.
  lista.innerHTML = favoritos.map((pokemon) => `
    <li class="favorito">
      <img class="favorito__imagen" src="assets/${pokemon.slug}.png" alt="" width="96" height="96">
      <h3 class="favorito__nombre">${pokemon.nombre} <span class="favorito__numero">${numeroPokedex(pokemon.id)}</span></h3>
      <ul class="favorito__tipos">
        ${pokemon.tipos.map((tipo) => `<li class="tipo tipo--${tipo}">${nombresTipos[tipo]}</li>`).join('')}
      </ul>
      <a class="boton boton--borde-azul boton--icono boton--icono-final icono-flecha favorito__detalle" href="detalle-pokemon-${pokemon.slug}.html">Ver detalle<span class="solo-lectores"> de ${pokemon.nombre}</span></a>
      <button class="boton boton--borde-rojo boton--icono boton--icono-final icono-cerrar favorito__quitar" type="button" data-id="${pokemon.id}">Quitar<span class="solo-lectores"> a ${pokemon.nombre}</span> de favoritos</button>
    </li>`).join('');

  document.querySelector('#favoritos-resumen').textContent = favoritos.length === 1
    ? '1 Pokémon marcado como favorito'
    : `${favoritos.length} Pokémon marcados como favoritos`;
  document.querySelector('#favoritos-vacio').hidden = favoritos.length > 0;
}

const modal = document.querySelector('#favoritos');

if (modal) {
  // Delegación: también funciona para las fichas creadas en cada renderizado.
  modal.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.favorito__quitar');
    if (boton) quitarFavorito(Number(boton.dataset.id));
  });

  modal.addEventListener('beforetoggle', (evento) => {
    if (evento.newState === 'open') pintarFavoritos();
  });

  window.addEventListener('favoritos:actualizados', pintarFavoritos);

  // El evento storage avisa de cambios hechos desde otra pestaña.
  window.addEventListener('storage', (evento) => {
    if (evento.storageArea === localStorage
        && (evento.key === 'pokedex:favoritos' || evento.key === null)) {
      pintarFavoritos();
    }
  });

  pintarFavoritos();
}

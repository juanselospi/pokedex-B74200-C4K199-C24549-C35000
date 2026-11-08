// =============================================================
//  perfil-entrenador.js  —  Muestra en el perfil los Pokémon
//  que la persona capturó desde la lista (leídos de localStorage).
//  Los diálogos (modales) se abren solos con command/commandfor;
//  este archivo solo llena el contenido de "Capturados".
// =============================================================
import { buscarPorId, numeroPokedex } from './datos.js';
import { listaCapturados } from './capturados.js';
import { listaFavoritos } from './favoritos.js';

const MINIATURAS_VISIBLES = 3;
const ESPACIOS_EQUIPO = 6;

let listaEquipo = () => [];

function fichasDesde(ids) {
  return ids
    .map(buscarPorId)
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);
}

function pintarTarjeta(nombre, texto, pokemones) {
  const tarjeta = document.querySelector(`.seccion--${nombre}`);
  if (!tarjeta) return;

  tarjeta.querySelector('.seccion__detalle').textContent = texto;

  const primeros = pokemones.slice(0, MINIATURAS_VISIBLES)
    .map((p) => `<span class="mini-sprites__item"><img src="assets/${p.slug}.png" alt="" width="34" height="34"></span>`)
    .join('');
  const resto = pokemones.length > MINIATURAS_VISIBLES
    ? `<span class="mini-sprites__item mini-sprites__mas">+${pokemones.length - MINIATURAS_VISIBLES}</span>`
    : '';
  tarjeta.querySelector('.mini-sprites').innerHTML = primeros + resto;
}

function pintarResumenFavoritos() {
  const favoritos = fichasDesde(listaFavoritos());
  const marcados = favoritos.length === 1 ? 'marcado' : 'marcados';
  pintarTarjeta('favoritos', `${favoritos.length} Pokémon ${marcados}`, favoritos);
}

function pintarResumenEquipo() {
  const equipo = fichasDesde(listaEquipo());
  pintarTarjeta('equipo', `${equipo.length} de ${ESPACIOS_EQUIPO} espacios ocupados`, equipo);
}

function pintarCapturados() {
  // Convierte los ids guardados en fichas completas (y descarta ids raros)
  const capturados = fichasDesde(listaCapturados());

  // 1) Resumen de la tarjeta de sección: el número y los mini-sprites
  pintarTarjeta('capturados', `${capturados.length} Pokémon en tu colección`, capturados);

  // 2) Grilla dentro del diálogo "Pokémon capturados"
  const grilla = document.querySelector('#modal-capturados .capturados');
  if (grilla) {
    if (capturados.length === 0) {
      grilla.innerHTML = '<li class="capturados__vacio">Todavía no capturaste ninguno. Entrá a la Pokédex y tocá “Capturar”.</li>';
    } else {
      grilla.innerHTML = capturados.map((p) => `
        <li class="captura">
          <input type="checkbox" class="captura__check" id="cap-${p.id}" value="${p.id}" aria-label="Seleccionar a ${p.nombre}">
          <label class="captura__cuerpo" for="cap-${p.id}">
            <span class="sprite-zona"><img src="assets/${p.slug}.png" alt="" width="96" height="96"></span>
            <span class="numero">${numeroPokedex(p.id)}</span>
            <span class="captura__nombre">${p.nombre}</span>
          </label>
        </li>`).join('');
    }
    const nota = document.querySelector('#modal-capturados .modal__nota');
    if (nota) nota.textContent = `${capturados.length} Pokémon capturados`;
  }
}

async function cargarEquipo() {
  try {
    ({ listaEquipo } = await import('./equipo.js'));
  } catch {
    return;
  }
  pintarResumenEquipo();
}

pintarCapturados();
pintarResumenFavoritos();
pintarResumenEquipo();
cargarEquipo();

window.addEventListener('favoritos-cambiados', pintarResumenFavoritos);
window.addEventListener('equipo-cambiado', pintarResumenEquipo);

window.addEventListener('storage', (evento) => {
  if (evento.key === 'pokedex:favoritos' || evento.key === null) pintarResumenFavoritos();
  if (evento.key === 'pokedex:equipo' || evento.key === null) pintarResumenEquipo();
});

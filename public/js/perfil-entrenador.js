// =============================================================
//  perfil-entrenador.js  —  Muestra en el perfil los Pokémon
//  que la persona capturó desde la lista (leídos de localStorage).
//  Los diálogos (modales) se abren solos con command/commandfor;
//  este archivo solo llena el contenido de "Capturados".
// =============================================================
import { buscarPorId, numeroPokedex } from './datos.js';
import { listaCapturados } from './capturados.js';

function pintarCapturados() {
  // Convierte los ids guardados en fichas completas (y descarta ids raros)
  const capturados = listaCapturados()
    .map(buscarPorId)
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  // 1) Resumen de la tarjeta de sección: el número y los mini-sprites
  const detalle = document.querySelector('.seccion--capturados .seccion__detalle');
  if (detalle) {
    detalle.textContent = `${capturados.length} Pokémon en tu colección`;
  }

  const mini = document.querySelector('.seccion--capturados .mini-sprites');
  if (mini) {
    const primeros = capturados.slice(0, 3)
      .map((p) => `<li><img src="assets/${p.slug}.png" alt="" width="34" height="34"></li>`)
      .join('');
    const resto = capturados.length > 3
      ? `<li class="mini-sprites__mas">+${capturados.length - 3}</li>` : '';
    mini.innerHTML = primeros + resto;
  }

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

pintarCapturados();
// =============================================================
//  modal-capturados.js  —  Acciones del pie del diálogo de
//  Capturados: manda los Pokémon seleccionados a Favoritos o al
//  Equipo. La lógica de cada lista vive en su propio módulo.
// =============================================================
import { listaFavoritos, agregarFavoritos } from './favoritos.js';

const modal = document.querySelector('#modal-capturados');

// Ids de las casillas marcadas (perfil-entrenador.js les pone value = id).
function seleccionados() {
  return [...modal.querySelectorAll('.captura__check:checked')]
    .map((casilla) => Number(casilla.value));
}

function limpiarSeleccion() {
  for (const casilla of modal.querySelectorAll('.captura__check:checked')) {
    casilla.checked = false;
  }
}

function avisar(texto) {
  modal.querySelector('.seleccion-estado').textContent = texto;
}

function plural(cantidad, singular, varios) {
  return cantidad === 1 ? `1 ${singular}` : `${cantidad} ${varios}`;
}

function marcarFavoritos() {
  const ids = seleccionados();
  if (ids.length === 0) {
    avisar('Seleccioná al menos un Pokémon.');
    return;
  }

  const antes = listaFavoritos().length;
  const nuevos = agregarFavoritos(ids).length - antes;
  limpiarSeleccion();

  avisar(nuevos === 0
    ? 'Ya estaban en favoritos.'
    : `${plural(nuevos, 'agregado', 'agregados')} a favoritos.`);
}

// Depende del módulo equipo.js. Contrato propuesto:
// agregarAlEquipo(ids) → { agregados: [], repetidos: [], sinEspacio: [] }
async function agregarAlEquipo() {
  const ids = seleccionados();
  if (ids.length === 0) {
    avisar('Seleccioná al menos un Pokémon.');
    return;
  }

  let equipo;
  try {
    equipo = await import('./equipo.js');
  } catch {
    avisar('El equipo todavía no está disponible.');
    return;
  }

  const { agregados, repetidos, sinEspacio } = equipo.agregarAlEquipo(ids);
  limpiarSeleccion();

  const partes = [];
  if (agregados.length > 0) partes.push(`${plural(agregados.length, 'agregado', 'agregados')} al equipo`);
  if (repetidos.length > 0) partes.push(`${plural(repetidos.length, 'ya estaba', 'ya estaban')}`);
  if (sinEspacio.length > 0) partes.push(`equipo lleno: ${plural(sinEspacio.length, 'no cupo', 'no cupieron')}`);
  avisar(partes.join(' · ') + '.');
}

if (modal) {
  modal.querySelector('[data-accion="favorito"]').addEventListener('click', marcarFavoritos);
  modal.querySelector('[data-accion="equipo"]').addEventListener('click', agregarAlEquipo);

  // Al abrir el diálogo, el mensaje de la acción anterior ya no aplica.
  modal.addEventListener('beforetoggle', (evento) => {
    if (evento.newState === 'open') avisar('');
  });
}

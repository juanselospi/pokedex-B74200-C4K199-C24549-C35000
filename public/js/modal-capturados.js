// =============================================================
//  modal-capturados.js  —  Acciones del pie del diálogo de
//  Capturados: manda los Pokémon seleccionados a Favoritos o al
//  Equipo. La lógica de cada lista vive en su propio módulo.
//  También filtra las tarjetas con el buscador del diálogo.
// =============================================================
import { buscarPorId } from './datos.js';
import { listaFavoritos, agregarFavoritos } from './favoritos.js';

const modal = document.querySelector('#modal-capturados');

// Igual que en lista.js: sin tildes y en minúscula para comparar
function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Oculta las tarjetas que no coinciden con el nombre o el tipo elegidos
function filtrar() {
  const datos = new FormData(modal.querySelector('.modal__buscador'));
  const texto = normalizar(datos.get('nombre') ?? '');
  const tipo = datos.get('tipo') ?? '';
  let visibles = 0;

  for (const tarjeta of modal.querySelectorAll('.captura')) {
    const pokemon = buscarPorId(Number(tarjeta.querySelector('.captura__check').value));
    const coincide = Boolean(pokemon)
      && normalizar(pokemon.nombre).includes(texto)
      && (tipo === '' || pokemon.tipos.includes(tipo));
    tarjeta.hidden = !coincide;
    if (coincide) visibles++;
  }

  // Mensaje solo si hay capturados pero ninguno coincide
  const grilla = modal.querySelector('.capturados');
  grilla.querySelector('.capturados__sin-resultados')?.remove();
  if (visibles === 0 && grilla.querySelector('.captura')) {
    grilla.insertAdjacentHTML('beforeend',
      '<li class="capturados__vacio capturados__sin-resultados">Ningún Pokémon coincide con la búsqueda.</li>');
  }
}

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

  // El buscador ya no recarga la página: filtra al enviar y mientras se escribe
  const buscador = modal.querySelector('.modal__buscador');
  buscador.addEventListener('submit', (evento) => {
    evento.preventDefault();
    filtrar();
  });
  buscador.addEventListener('input', filtrar);

  // Al abrir el diálogo, el mensaje de la acción anterior ya no aplica.
  // También se vuelve a filtrar: al recargar, el navegador restaura lo que
  // estaba escrito o elegido en el buscador, pero sin disparar 'input'.
  modal.addEventListener('beforetoggle', (evento) => {
    if (evento.newState === 'open') {
      avisar('');
      filtrar();
    }
  });
}

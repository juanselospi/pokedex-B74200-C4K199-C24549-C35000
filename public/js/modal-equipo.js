import { buscarPorId, numeroPokedex } from './datos.js';
import { listaEquipo, quitarDelEquipo, MAX_EQUIPO } from './equipo.js';

const modal = document.querySelector('#modal-equipo');

function nombreTipo(tipo) {
  return tipo === 'electrico' ? 'Eléctrico' : tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

function fichaHTML(p) {
  const tipos = p.tipos
    .map((tipo) => `<span class="tipo tipo--${tipo}">${nombreTipo(tipo)}</span>`)
    .join('');

  return `
    <li class="equipo__ficha">
      <div class="sprite-zona"><span class="numero">${numeroPokedex(p.id)}</span><img src="assets/${p.slug}.png" alt="" width="96" height="96"></div>
      <h3>${p.nombre}</h3>
      <span class="tipos">${tipos}</span>
      <button type="button" class="boton boton--borde-rojo boton--chico" data-quitar-equipo="${p.id}"><svg class="icono" aria-hidden="true" width="24" height="24"><use href="#i-minus"/></svg> Quitar<span class="solo-lectores"> a ${p.nombre} del equipo</span></button>
    </li>`;
}

function pintarEquipo() {
  const equipo = listaEquipo()
    .map(buscarPorId)
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  const libres = MAX_EQUIPO - equipo.length;
  const disponibles = libres === 1 ? '1 espacio disponible' : `${libres} espacios disponibles`;

  modal.querySelector('.modal__subtitulo').innerHTML =
    `<span>${equipo.length} de ${MAX_EQUIPO} espacios ocupados</span><span>${disponibles}</span>`;

  const lista = modal.querySelector('.equipo');
  lista.innerHTML = equipo.length === 0
    ? '<li class="modal__nota">Todavía no tenés Pokémon en el equipo. Podés agregarlos desde Capturados.</li>'
    : equipo.map(fichaHTML).join('');
}

if (modal) {
  modal.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-quitar-equipo]');
    if (!boton) return;
    quitarDelEquipo(Number(boton.dataset.quitarEquipo));
  });

  modal.addEventListener('beforetoggle', (evento) => {
    if (evento.newState === 'open') pintarEquipo();
  });
  window.addEventListener('equipo-cambiado', pintarEquipo);
  window.addEventListener('storage', (evento) => {
    if (evento.key === 'pokedex:equipo' || evento.key === null) pintarEquipo();
  });

  pintarEquipo();
}

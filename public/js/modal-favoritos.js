import { buscarPorId, numeroPokedex } from './datos.js';
import { listaFavoritos, quitarFavorito } from './favoritos.js';

const modal = document.querySelector('#modal-favoritos');

function pintarFavoritos() {
  const favoritos = listaFavoritos()
    .map(buscarPorId)
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  const lista = modal.querySelector('.favoritos');
  modal.querySelector('.modal__subtitulo').textContent =
    `${favoritos.length} Pokémon marcados como favoritos`;

  if (favoritos.length === 0) {
    lista.innerHTML = '<li class="modal__nota">Todavía no tenés favoritos. Podés agregarlos desde Capturados.</li>';
    return;
  }

  // Solo usamos los datos de la Pokédex para construir las fichas.
  lista.innerHTML = favoritos.map((p) => {
    const tipos = p.tipos.map((tipo) => {
      const nombre = tipo === 'electrico' ? 'Eléctrico' : tipo.charAt(0).toUpperCase() + tipo.slice(1);
      return `<span class="tipo tipo--${tipo}">${nombre}</span>`;
    }).join('');

    return `
      <li class="favorito">
        <span class="favorito__estrella"><svg class="icono icono--fav" aria-hidden="true" width="24" height="24"><use href="#i-star"/></svg></span>
        <div class="sprite-zona sprite-zona--chica"><img src="assets/${p.slug}.png" alt="" width="64" height="64"></div>
        <div class="favorito__datos">
          <h3>${p.nombre} <span class="numero">${numeroPokedex(p.id)}</span></h3>
          <span class="tipos">${tipos}</span>
        </div>
        <div class="favorito__acciones">
          <a class="boton boton--borde-azul boton--chico" href="detalle.html?id=${p.id}">Ver detalle<span class="solo-lectores">: ${p.nombre}</span> <svg class="icono" aria-hidden="true" width="24" height="24"><use href="#i-arrow"/></svg></a>
          <button type="button" class="boton boton--borde-rojo boton--chico" data-quitar-favorito="${p.id}">Quitar de favoritos<span class="solo-lectores">: ${p.nombre}</span></button>
        </div>
      </li>`;
  }).join('');
}

if (modal) {
  modal.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-quitar-favorito]');
    if (!boton) return;
    quitarFavorito(Number(boton.dataset.quitarFavorito));
  });

  // beforetoggle también cubre aperturas mediante showModal() de otros módulos.
  modal.addEventListener('beforetoggle', (evento) => {
    if (evento.newState === 'open') pintarFavoritos();
  });
  window.addEventListener('favoritos-cambiados', pintarFavoritos);
  window.addEventListener('storage', (evento) => {
    if (evento.key === 'pokedex:favoritos' || evento.key === null) pintarFavoritos();
  });

  pintarFavoritos();
}

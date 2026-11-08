const CLAVE = 'pokedex:favoritos';

function esIdValido(id) {
  return Number.isInteger(id) && id > 0;
}

// Conserva el mismo formato que Capturados: un arreglo de ids numéricos.
function leer() {
  try {
    const ids = JSON.parse(localStorage.getItem(CLAVE)) ?? [];
    return new Set(Array.isArray(ids) ? ids.filter(esIdValido) : []);
  } catch {
    return new Set();
  }
}

function escribir(conjunto) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...conjunto]));
  } catch {
    return; // Si no se puede guardar, no anunciamos un cambio persistido.
  }

  // El modal y los resúmenes pueden escuchar este evento y consultar la lista.
  window.dispatchEvent(new Event('favoritos-cambiados'));
}

export function listaFavoritos() {
  return [...leer()];
}

// Recibe ids, por ejemplo agregarFavoritos([1, 4, 25]). Devuelve la lista guardada.
export function agregarFavoritos(ids) {
  const favoritos = leer();
  for (const id of ids) {
    if (esIdValido(id)) favoritos.add(id);
  }
  escribir(favoritos);
  return listaFavoritos();
}

// Recibe un id numérico. Devuelve la lista guardada después de quitarlo.
export function quitarFavorito(id) {
  const favoritos = leer();
  favoritos.delete(id);
  escribir(favoritos);
  return listaFavoritos();
}

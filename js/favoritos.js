const CLAVE = 'pokedex:favoritos';

// Lee los ids numéricos guardados, sin repetidos.
function leer() {
  try {
    return new Set(JSON.parse(localStorage.getItem(CLAVE)) ?? []);
  } catch {
    return new Set();
  }
}

function escribir(conjunto) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...conjunto]));
  } catch {
    return; // Si no se puede guardar, no anunciamos un cambio.
  }

  // Otras vistas pueden escuchar este evento y consultar listaFavoritos().
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('favoritos:actualizados'));
  }
}

export function listaFavoritos() {
  return [...leer()];
}

// Recibe un arreglo de ids numéricos; para agregar uno, usar [id].
// Devuelve la lista leída del almacenamiento después de guardar.
export function agregarFavoritos(ids) {
  const favoritos = leer();
  for (const id of ids) {
    favoritos.add(id);
  }
  escribir(favoritos);
  return listaFavoritos();
}

// Devuelve la lista leída del almacenamiento después de quitar el id.
export function quitarFavorito(id) {
  const favoritos = leer();
  favoritos.delete(id);
  escribir(favoritos);
  return listaFavoritos();
}

const CLAVE = 'pokedex:equipo';

export const MAX_EQUIPO = 6;

function esIdValido(id) {
  return Number.isInteger(id) && id > 0;
}

function leer() {
  try {
    const ids = JSON.parse(localStorage.getItem(CLAVE)) ?? [];
    return new Set(Array.isArray(ids) ? ids.filter(esIdValido).slice(0, MAX_EQUIPO) : []);
  } catch {
    return new Set();
  }
}

function escribir(conjunto) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...conjunto]));
  } catch {
    return;
  }

  window.dispatchEvent(new Event('equipo-cambiado'));
}

export function listaEquipo() {
  return [...leer()];
}

export function agregarAlEquipo(ids) {
  const equipo = leer();
  const resultado = { agregados: [], repetidos: [], sinEspacio: [] };

  for (const id of ids) {
    if (!esIdValido(id)) continue;

    if (equipo.has(id)) {
      resultado.repetidos.push(id);
    } else if (equipo.size >= MAX_EQUIPO) {
      resultado.sinEspacio.push(id);
    } else {
      equipo.add(id);
      resultado.agregados.push(id);
    }
  }

  if (resultado.agregados.length > 0) escribir(equipo);
  return resultado;
}

export function quitarDelEquipo(id) {
  const equipo = leer();
  equipo.delete(id);
  escribir(equipo);
  return listaEquipo();
}

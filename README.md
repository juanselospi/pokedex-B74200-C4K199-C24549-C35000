# Pokédex — CI-0137

Laboratorio 1 del curso Desarrollo de Aplicaciones Web, Escuela de
Ciencias de la Computación e Informática, Universidad de Costa Rica.

## Integrantes

| Nombre         | Carné   |
| -------------- | ------- |
| Jeferson Marín | C24549  |
| Agustín Soto   | C4K199  |
| Albin Monge    | C35000  |
| Juan Loaiza    | B74200  |

## Sitio publicado

[Link al sitio en github pages](https://juanselospi.github.io/pokedex-B74200-C4K199-C24549-C35000/)

## Puntos extra realizados

- **Formulario para editar el entrenador:** el botón *Editar perfil* abre un
  diálogo con un formulario para cambiar nombre, edad, ciudad, estatura y
  biografía, con campos etiquetados, agrupados y botones de guardar y cancelar.

---

## Qué hay acá

```
index.html                             Lista de Pokémon: buscador, rejilla, paginación
detalle-pokemon-{nombre-pokemon}.html  Ficha completa de un Pokémon
assets/                                Imágenes: sprites, ilustraciones, logo, pokébolas
design/                                Wireframes
```

La rejilla muestra **diez** Pokémon: la línea de Bulbasaur, la de Charmander,
la de Squirtle y Pikachu. Pero solo existe **una** página de detalle, la de
Squirtle. Las tarjetas de los demás ya tienen su enlace escrito y sus imágenes
en `assets/`, pero esos archivos todavía no existen: si hacés clic te va a dar
error 404, y está bien. Construir esas fichas es parte de los ejercicios.

## Sobre las imágenes y los datos

Las ilustraciones y sprites vienen del repositorio público
[PokeAPI/sprites](https://github.com/PokeAPI/sprites), el mismo proyecto cuya
API vamos a consumir más adelante en el curso. Las imágenes `nombre.png` son
los sprites clásicos de 96×96; las `nombre-grande.png` son la ilustración
oficial de 475×475.

Los datos (tipos, pesos, tamaños, habilidades y estadísticas base) están
tomados de [Pokémon Database](https://pokemondb.net/).

Pokémon y sus personajes son marcas registradas de Nintendo, Game Freak y The
Pokémon Company. Este proyecto no tiene ninguna relación con ellos y se usa
únicamente con fines educativos, sin fines de lucro.

# Pokédex — CI-0137

Proyecto de referencia del curso **Desarrollo de Aplicaciones Web**, Escuela de
Ciencias de la Computación e Informática, Universidad de Costa Rica.

Este repositorio se va actualizando clase a clase. Y su objetivo es que, en caso
de que se quedan botados en algún punto o quieran comparar su código con el que
desarrollamos durante la clase, puedan acceder al mismo de forma sencilla.

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

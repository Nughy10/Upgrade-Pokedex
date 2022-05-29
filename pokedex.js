// <!-- UPGRADEHUB POKÉDEX - Pau Isach Noguera -->

//Definimos una variable y le passamos una lista ol vacia creada en el HTML. 
const pokedex = document.getElementById("pokedex");
//Definimos una matriz vacia donde guardaremos los pokémons. Estra matriz no se modifica!
const ALL_POKEMONS = []; 
//Definimos una matriz con los tipos de pokémons que podemos encontrar en la api. 
const TYPES = [
  "all",
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "fairy",
];

//Definimos una función y le retornamos la dirección de la api pokemos (fetch para url).

const getAllPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const responseJson = await response.json();
  const results = await responseJson.results; 
  return results;
};

//Definimos una función y le retornamos una dirección vacia donde guardaremos pokemonsi (fethc para url).

const getIndividualPokemon = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    const pokemon = {
        name: responseJson.name,
        id: responseJson.id,
        type: responseJson.types.map((type) => type.type.name),
        image: responseJson.sprites["front_default"],
      };
      return pokemon;
};

//Definimos una función y que va a recibir una lista de pokemons y la va a ejecutar. 
const drawPokemons = (pokemons) => {
    //Primero borra todos los pokémons dentro de la pokédex, siempre primer paso. 
    pokedex.innerHTML = ""; 
    //Y después irá añadiendo un pokémon por cada elemento del array que reciba. 
    pokemons.forEach((poke) => {
    //Definimos una variable, le asignamos un listado li y le añadimos cada carta pokémon. 
    const li = document.createElement("li");
    li.classList.add("card");
    //Definimos una variable donde guardaremos tres informaciones (imagen, nombre y tipo).
    const html = `
            <p class="card__id">#${poke.id}</p>
            <img class="card__image" src=${poke.image} alt=${poke.name}>
            <p class="card__title">${poke.name}<p>
            <div class="card__subtitle">${poke.type[0]} ${poke.type[1] ? `, ${poke.type[1]}` : ''}</div>
        `;
    //Añadimos las informaciones a cada carta del listado li definido anteriormente. 
    li.innerHTML = html;
    if(poke.id === 1 || poke.id === 4 || poke.id === 7 || poke.id === 25){
        li.classList.add("green");
    }
    if(poke.id === 54 || poke.id === 142){
        li.classList.add("orange");
    }
    //Pasamos la lista li al listado lo que hemos definido al principio del codigo y en el HTML. 
    pokedex.appendChild(li);
  });
};

//Definimos una función para poder hacer el filtraje de pokémons. 
const filter = (event) => {
    //Definimos una variable y le asignamos que todos los valores sean LowerCase. 
    const inputValue = event.target.value.toLowerCase();
    // //Definimos una función que retornará el filtraje de pokémon por nombre y número. 
    const filtered = ALL_POKEMONS.filter((pokemon) => {
    // //Definimos dos variables y le asignamos sus respectivas funciones y el input para filtrar. 
    // //Ahora ya podremos buscar los pokémons por nombre o número en el input de filtraje. 
    const matchName = pokemon.name.toLowerCase().includes(inputValue);
    const matchId = pokemon.id === Number(inputValue);
    // //Retornamos los valores de nombre y número de pokémon. 
    return matchName || matchId;
    });
   //Llamamos la función anterior que recibia todos los pokémons pero le pasamos 
   //el valor retornado de la función de filtraje que hemos definido. 
drawPokemons(filtered);
};

// //Definimos una función que añada un evento en el input para el filtraje de pokémon. 
const addAllMyEventsListeners = () => {
    //El input lo cojemos del HTML y lo relacionamos con el evento para filtrar. 
    document.getElementById("input-search").addEventListener("input", filter);
    document.getElementById("select-type").addEventListener("change",filterByType);
};

//Definimos una función para poder filtrar los pokemon por su tipologia. 
const filterByType = (event) => {
    //Definimos una constante donde le pasaremos la posició (vacia de momento) de un pokémon. 
    const typeToFilter = event.target.value;
    //Definimos un condicional que retornará toda la lista de pikemons si filtramos por ALL. 
    if (typeToFilter === 'all') {
        return drawPokemons(ALL_POKEMONS);
    }
    //Definimos otra función que filtrará y retornará los pokemons según por el tipo que filtres. 
    const filtered = ALL_POKEMONS.filter((pokemon) => {
    //Definimos una variable ddonde guardaremos los pokemons que hayamos filtrado. 
    const matchType = pokemon.type.includes(typeToFilter);
        return matchType;
    });
//Llamamos la función anterior que recibia todos los pokémons pero le pasamos 
//el valor retornado de la función de filtraje que hemos definido. 
drawPokemons(filtered);
};

//Definimos una función que añadirá los botones necesarios para el filtraje. 
const drawTypesButtons = () => {
//Definimos una variable y le asignamos el div que hemos definido en el HTML. 
const typesContainer$$ = document.querySelector(".types");

//Definimos una función con un for que creará un span por cada tipo de pokemon. 
//Añadimos los tipos en estos divs y le asignamos con un evento que nos filtre por tipos. 
//Añadimos el texto y también añadimos todo el bloque a la pantalla. 
// TYPES.forEach((type) => {
//     const span = document.createElement("span");
//     span.classList.add(type);
//     span.addEventListener("click", filterByType);
//     span.innerText = type;
//     typesContainer$$.appendChild(span);
//   });
};

//Definimos una función asíncrona que nos va a recoger la información respetando un orden. 
const startMyCode = async () => {
    //Llamamos las dos sfunciones que contienen los botones y el input de filtraje. 
    addAllMyEventsListeners();
    drawTypesButtons();
    //Definimos una funcion con el await que espere a que recoja toda la informacion de la api. 
    const allPokemons = await getAllPokemons(); 
    console.log(allPokemons)
    //Definimos un bucle for que recorra toda la lista de pokémon de la api. 
    for (const pokemon of allPokemons) {
        //Definimos una constante con el await para que espere que recoja la informacion de cada pokémon. 
        const pokemonInfo = await getIndividualPokemon(pokemon.url);
    //Quando termine de leer toda la informacion individual, añade todo los pokemons de golpe. 
    ALL_POKEMONS.push(pokemonInfo);
  }
  //Imprimir por pantalla todos los pokemons. 
  console.log(ALL_POKEMONS);
  drawPokemons(ALL_POKEMONS);
};
//Llamamos la función anterior que imprime todos los pokémons de la api. 
startMyCode();

// <!-- UPGRADEHUB POKÉDEX - Pau Isach Noguera -->

//Definimos una variable y le passamos una lista "ol" vacia creada en el HTML. 
const pokedex = document.getElementById("pokedex");
//Definimos una matriz vacia donde guardaremos los pokémons. Esta matriz no se modifica!
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

//Definimos una función asíncrona que recojerá la api de pokémons. 
//Definimos una variable de espera y con el fetch recojemos los datos de la api. 
//Definimos una variable de espera y con el json habilitamos su lectura. 
//Definimos una variable de espera con los resultados finales, que retornamos. 
const getAllPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const responseJson = await response.json();
  const results = await responseJson.results; 
  return results;
};

//Definimos una función asíncrona que recojerá la información individual de un pokémon. 
//Definimos una variable de espera y con el fetch recojemos los datos de la api. 
//Definimos una variable de espera y con el json habilitamos su lectura. 
//Definimos una variable de espera con los resultados finales (nombre, id, tipo e imagen), que retornamos. 
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

//Definimos una función que va a recibir una lista "li" de pokémons y la va a ejecutar. 
const drawPokemons = (pokemons) => {
    //Primero borra todos los pokémons dentro de la pokédex, siempre primer paso. 
    pokedex.innerHTML = ""; 
    //Y después irá añadiendo un pokémon por cada elemento del array que reciba. 
    pokemons.forEach((poke) => {
    //Definimos una variable, le asignamos un listado "li" y le añadimos cada carta pokémon. 
    const li = document.createElement("li");
    li.classList.add("card");
    //Definimos una variable donde guardaremos las informaciones id, imagen, nombre y tipo.
    const html = `
            <p class="card__id">#${poke.id}</p>
            <img class="card__image" src=${poke.image} alt=${poke.name}>
            <p class="card__title">${poke.name}<p>
            <div class="card__subtitle">${poke.type[0]} ${poke.type[1] ? `, ${poke.type[1]}` : ''}</div>
        `;
    //Añadimos las informaciones a cada carta del listado "li" en el documento HTML. 
    li.innerHTML = html;
    //Bucle if para pintar los pokémons conseguidos en verde y añadirlo al listado "li".
    if(poke.id === 1 || poke.id === 4 || poke.id === 7 || poke.id === 25){
        li.classList.add("green");
    }
    //Bucle if para pintar los pokémons a conseguir en naranja y añadirlo al listado "li".
    if(poke.id === 54 || poke.id === 142){
        li.classList.add("orange");
    }
    //Pasamos la lista "li" al listado "lo" que hemos definido al principio del codigo y en el HTML. 
    pokedex.appendChild(li);
  });
};

//Definimos una función para poder hacer el filtraje de pokémons. 
const filter = (event) => {
    //Definimos una variable y le asignamos que todos los valores sean LowerCase. 
    const inputValue = event.target.value.toLowerCase();
    //Definimos una función que retornará el filtraje de pokémon por nombre y número. 
    const filtered = ALL_POKEMONS.filter((pokemon) => {
    //Definimos dos variables y les asignamos sus respectivas funciones y el input para filtrar. 
    //Ahora ya podremos buscar los pokémons por nombre o número en el input de filtraje. 
    const matchName = pokemon.name.toLowerCase().includes(inputValue);
    const matchId = pokemon.id === Number(inputValue);
    //Retornamos los valores de nombre y número de pokémon. 
    return matchName || matchId;
    });
//Llamamos la función anterior que recibia todos los pokémons pero le pasamos 
//el valor retornado de la función de filtraje que hemos definido. 
drawPokemons(filtered);
};

//Definimos una función de evento para el input y el selector de filtraje pokémon. 
const addAllMyEventsListeners = () => {
    //El input lo cojemos del HTML y lo relacionamos con el evento para filtrar. 
    //Igualmente, cojemos el selector del HTML y lo relacionamos con el evento. 
    document.getElementById("input-search").addEventListener("input", filter);
    document.getElementById("select-type").addEventListener("change",filterByType);
};

//Definimos una función para poder filtrar los pokemon por su tipologia. 
const filterByType = (event) => {
    //Definimos una constante donde le pasaremos la información del tipo de pokémon a filtrar. 
    const typeToFilter = event.target.value;
    //Definimos un condicional que retornará toda la lista de pokémons si filtramos por ALL. 
    if (typeToFilter === 'all') {
        return drawPokemons(ALL_POKEMONS);
    }
    //Definimos otra función que filtrará y retornará los pokemons según por el tipo que filtres. 
    const filtered = ALL_POKEMONS.filter((pokemon) => {
    //Definimos una variable donde guardaremos los pokemons que hayamos filtrado segun el tipo. 
    const matchType = pokemon.type.includes(typeToFilter);
        return matchType;
    });
//Llamamos la función anterior que recibia todos los pokémons pero le pasamos 
//el valor retornado de la función de filtraje que hemos definido. 
drawPokemons(filtered);
};

//Definimos una función asíncrona final que nos va a inicializar el código. 
const startMyCode = async () => {
    //Llamamos las dos funciones que contienen el input y el selector de filtraje. 
    addAllMyEventsListeners();
    //Definimos una función de espera que recoja los datos de la api pokémon.  
    const allPokemons = await getAllPokemons(); 
    //Definimos un bucle for que recorra toda la lista de pokémon de la api individualmente. 
    for (const pokemon of allPokemons) {
        //Definimos una variable de espera que recoja los datos de cada pokémon a partir de la url. 
        const pokemonInfo = await getIndividualPokemon(pokemon.url);
    //Cuando termine de leer toda la informacion individual, añade todo los pokemons de golpe. 
    ALL_POKEMONS.push(pokemonInfo);
  }
  //Imprimir por pantalla por consola todos los pokemons. 
  drawPokemons(ALL_POKEMONS);
};
//Llamamos la función anterior que inicializa el programa de la pokédex.  
startMyCode();

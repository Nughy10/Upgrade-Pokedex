// <!-- UPGRADEHUB POKÉDEX - Pau Isach Noguera -->

//Definimos una matriz vacia donde guardaremos los pokémons. Estra matriz no se modifica!
const ALL_POKEMONS = [];

const input = document.querySelector("input");
const button = document.querySelector("button");
const ol = document.querySelector("ol");

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

const filter = (event) => {
  //Definimos una variable y le asignamos que todos los valores sean LowerCase.
  console.log(input.value);
  const inputValue = input.value.toLowerCase();
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
  console.log("filtered", filtered);
  creation(filtered);
};

// crear una funcion que cree 3 elementos y darle contenido del input.

// <div class="card__subtitle">${poke.type} ${poke.type[1] ? `, ${poke.type[1]}` : ''}</div>
const creation = (pokemons) => {
  // const li$$ = document.createElement("li")

  pokemons.forEach((poke) => {
    //Definimos una variable, le asignamos un listado li y le añadimos cada carta pokémon.
    const buttonsDiv = document.createElement("div");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    const li = document.createElement("li");
    li.classList.add("card");
    buttonsDiv.classList.add("card__buttons");
    button1.classList.add("card__buttons__delete");
    button2.classList.add("card__buttons__catch");

    //Definimos una variable donde guardaremos tres informaciones (imagen, nombre y tipo).
    const html = `
                <p class="card__id">#${poke.id}</p>
                <img class="card__image" src=${poke.image} alt=${poke.name}>
                <p class="card__title">${poke.name}<p>
                <div class="card__subtitle">${poke.type[0]} ${
      poke.type[1] ? `, ${poke.type[1]}` : ""
    }</div>
            `;
    //Añadimos las informaciones a cada carta del listado li definido anteriormente.
    li.innerHTML = html;
    if (poke.id === 1 || poke.id === 4 || poke.id === 7 || poke.id === 25) {
      li.classList.add("green");
    }
    button1.innerText = "X";
    button2.innerText = "✔";
    const borrar = (event) => {
      event.remove();
    };
    button1.addEventListener("click", () => borrar(li));
    const catched = (event) => {
      li.classList.add("green");
    };
    button2.addEventListener("click", () => catched(li));
    buttonsDiv.appendChild(button2);
    buttonsDiv.appendChild(button1);
    li.appendChild(buttonsDiv);
    //Pasamos la lista li al listado lo que hemos definido al principio del codigo y en el HTML.
    ol.appendChild(li);
  });
};

// //Definimos una función que añada un evento en el input para el filtraje de pokémon.
const addAllMyEventsListeners = () => {
  //El input lo cojemos del HTML y lo relacionamos con el evento para filtrar.
  // document.getElementById("input-search").addEventListener("input", filter);
  // document.getElementById("select-type").addEventListener("change",filterByType);
  // input$$.addEventListener("input", filter);
  button.addEventListener("click", filter);
};

const startMyCode = async () => {
  const startPoint = [];
  //Llamamos las dos sfunciones que contienen los botones y el input de filtraje.
  addAllMyEventsListeners();
  //Definimos una funcion con el await que espere a que recoja toda la informacion de la api.
  const allPokemons = await getAllPokemons();
  console.log(allPokemons);
  //Definimos un bucle for que recorra toda la lista de pokémon de la api.
  for (const pokemon of allPokemons) {
    //Definimos una constante con el await para que espere que recoja la informacion de cada pokémon.
    const pokemonInfo = await getIndividualPokemon(pokemon.url);
    //Quando termine de leer toda la informacion individual, añade todo los pokemons de golpe.
    if (
      pokemonInfo.id === 1 ||
      pokemonInfo.id === 4 ||
      pokemonInfo.id === 7 ||
      pokemonInfo.id === 25
    ) {
      startPoint.push(pokemonInfo);
    }
    if (pokemonInfo.id === 54 || pokemonInfo.id === 142) {
      startPoint.push(pokemonInfo);
    }
    ALL_POKEMONS.push(pokemonInfo);
  }
  //Imprimir por pantalla todos los pokemons.
  console.log(ALL_POKEMONS);
  creation(startPoint);
};
//Llamamos la función anterior que imprime todos los pokémons de la api.
startMyCode();

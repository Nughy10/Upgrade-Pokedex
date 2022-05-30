// <!-- UPGRADEHUB POKÉDEX - Pau Isach Noguera -->

//Definimos una matriz vacia donde guardaremos los pokémons. Esta matriz no se modifica!
const ALL_POKEMONS = [];

//Definimos una variable que recoja el input definido en el documento HTML. 
//Definimos una variable que recoja el botón definido en el documento HTML. 
//Definimos una variable que recoja la lista definido en el documento HTML. 
const input = document.querySelector("input");
const button = document.querySelector("button");
const ol = document.querySelector("ol");

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

//Definimos una función para poder hacer el filtraje de pokémons. 
const filter = (event) => {
  //Definimos una variable y le asignamos que todos los valores sean LowerCase.
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
  creation(filtered);
};

//Definimos una función que va a recibir una lista "li" de pokémons y la va a ejecutar. 
const creation = (pokemons) => {
//Definimos una función con un bucle for para que recorra todos los pokémons individualmente. 
pokemons.forEach((poke) => {
    //Definimos una variable para crear un div que englobe los dos botones. 
    //Definimos dos variables para crear los dos botones, añadir y borrar. 
    const buttonsDiv = document.createElement("div");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    //Definimos una variable para crear una lista "li" y le añadimos los pokemons individualmente. 
    const li = document.createElement("li");
    li.classList.add("card");
    //Añadimos el div para los botones juntamente con los respectivos. 
    buttonsDiv.classList.add("card__buttons");
    button1.classList.add("card__buttons__delete");
    button2.classList.add("card__buttons__catch");

    //Definimos una variable donde guardaremos las informaciones id, imagen, nombre y tipo.
    //Variable definida entre acentos para poder añadir variables de javas script dentro del string creado de HTML. 
    const html = `
                <p class="card__id">#${poke.id}</p>
                <img class="card__image" src=${poke.image} alt=${poke.name}>
                <p class="card__title">${poke.name}<p>
                <div class="card__subtitle">${poke.type[0]} ${poke.type[1] ? `, ${poke.type[1]}` : ""}</div>
            `;
    //Añadimos las informaciones a cada carta del listado li definido anteriormente.
    li.innerHTML = html;
    //Bucle if para pintar los pokémons conseguidos en verde y añadirlo al listado "li".
    if (poke.id === 1 || poke.id === 4 || poke.id === 7 || poke.id === 25) {
      li.classList.add("green");
    }
    //Añadir texto en el botón de borrar carta de pokemon.
    //Definimos una función con un evento para borrar la información del pokémon. 
    button1.innerText = "X";
    const borrar = (event) => {
        event.remove();
    };
    //Esta función y condicional son para todos los pokémons excepto los (6) por defecto.  
    //Definimos una función con un evento de click del ratón para el botón tic/refresh.
    button1.addEventListener("click", () => borrar(li));
    //Definimos una función para pintar un texto u otro en el botón según corresponda. 
    const catched = (event) => {
        //Definimos un bucle for para que aparezca un "tic" si NO disponemos del pokémon.
        if(li.classList.contains("green")){
            li.classList.remove("green");
            button2.innerText = "✔";
          //En cambio, definimos un else para que aprarezca un "refresh" si disponemos del pokémon.  
        } else {
            li.classList.add("green");
            button2.innerText = "↻";

        }
    };
    //Esta función y condicional sólo son para los (6) pokemons que aprarecen por defecto. 
    //Definimos una función con un evento de click del ratón para el botón tic/refresh.
    button2.addEventListener("click", () => catched(li));
    //Definimos un bucle if para que aprarezca un "refresh" si disponemos del pokémon. 
    if(li.classList.contains("green")){
        button2.innerText = "↻";
        //En cambio, definimos un else para que aparezca un "tic" si NO disponemos del pokémon. 
    } else {
        button2.innerText = "✔";

    }
    buttonsDiv.appendChild(button2);
    buttonsDiv.appendChild(button1);
    li.appendChild(buttonsDiv);
    //Pasamos la lista li al listado lo que hemos definido al principio del codigo y en el HTML.
    ol.appendChild(li);
  });
};

//Definimos una función de evento para el botón de filtraje pokémon. 
const addAllMyEventsListeners = () => {
  //El botón lo cojemos del HTML y lo relacionamos con el evento para filtrar. 
  button.addEventListener("click", filter);
};

//Definimos una función asíncrona final que nos va a inicializar el código. 
const startMyCode = async () => {
  //Definimos una variable con una array vacia para guardar los (6) pokémons por defecto. 
  const startPoint = [];
  //Llamamos la función que contiene el botón para el inicio de filtraje. 
  addAllMyEventsListeners();
  //Definimos una función de espera que recoja toda la información de la api pokémon.
  const allPokemons = await getAllPokemons();
  //Definimos un bucle for que recorra toda la lista de pokémon de la api individualmente.
  for (const pokemon of allPokemons) {
    //Definimos una variable de espera que recoja los datos de cada pokémon a partir de la url.
    const pokemonInfo = await getIndividualPokemon(pokemon.url);
    //Definimos un condicional if para que aparezcan en verde los pokémon con las id siguientes. 
    if (
      pokemonInfo.id === 1 ||
      pokemonInfo.id === 4 ||
      pokemonInfo.id === 7 ||
      pokemonInfo.id === 25
    ) {
      //Añadimos los pokemons a la array vacia que creamos anteriormente. 
      startPoint.push(pokemonInfo);
    }
    //Definimos un condicional if para que aparezcan en naranja los pokémon con las id siguientes. 
    if (pokemonInfo.id === 54 || pokemonInfo.id === 142) {
      //Añadimos los pokémons a la array vacia que creamos anteriormente.
      startPoint.push(pokemonInfo);
    }
    //Añadimos los pokémons también a la array vacia inicial (la que se imprimirá por pantalla).
    ALL_POKEMONS.push(pokemonInfo);
  }
  //Imprimir por pantalla todos los pokémons.
  creation(startPoint);
};
//Llamamos la función anterior que imprime todos los pokémons de la api.
startMyCode();

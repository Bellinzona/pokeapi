let container = document.querySelector(".container")
let input = document.querySelector("input")
let btn = document.querySelector("button")
let incorrecto = document.querySelector(".incorrecto")
let bodystyle = document.querySelector("body")
let informacion = document.querySelector(".informacion")
let pokemonesBuscados = document.querySelector(".pokemonesBuscados")
let pokeList = []


function pokemon(imagen, nombre, tipo, numero) {
    this.imagen = imagen
    this.nombre = nombre
    this.tipo = tipo
    this.numero = numero


}



function pokemonGuardado(a, b, c, d) {
    let pokemonG = document.createElement("div")
    let imagen = document.createElement("img")
    let nombre = document.createElement("p")
    let tipo = document.createElement("p")
    let numero = document.createElement("p")

    pokemonG.classList.add("pokemonG")
    nombre.classList.add("nombre")
    tipo.classList.add("tipo")
    numero.classList.add("numero")

    imagen.src = a
    nombre.textContent = b
    tipo.textContent = c
    numero.textContent = d

    pokemonG.appendChild(imagen)
    pokemonG.appendChild(nombre)
    pokemonG.appendChild(tipo)
    pokemonG.appendChild(numero)

    return pokemonG



}

function guardarPokeListEnLocalStorage() {
    localStorage.setItem("pokeList", JSON.stringify(pokeList));
}


function cargarPokeListDesdeLocalStorage() {
    const pokeListGuardada = localStorage.getItem("pokeList");
    if (pokeListGuardada) {
        pokeList = JSON.parse(pokeListGuardada);
        console.log(pokeList)
        pokemonesBuscados.style.display = "flex"
        for(let i = 0; i < pokeList.length; i++)
            pokemonesBuscados.appendChild(pokemonGuardado(pokeList[i].imagen,pokeList[i].nombre,pokeList[i].tipo,pokeList[i].numero))
            
    }
}

cargarPokeListDesdeLocalStorage();

let cargarPokemon = async function (poke) {
    try {

        console.log()

        const rta = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`);
        const datos = await rta.json()
        console.log(datos)


        informacion.innerHTML = `<img src="${datos.sprites.front_default}" alt="" width="40px">

                                    <div class="pokeData">
                                        <h1>${datos.name}</h1>
                                            <p>${datos.types[0].type.name}</p>
                                            <p>#${datos.order}</p>

                                    </div>`


        container.style.height = "500px"
        container.style.justifyContent = "flex-start"
        container.style.alignItems = "flex-start"




        pokemonesBuscados.appendChild(pokemonGuardado(datos.sprites.front_default, datos.name, datos.types[0].type.name, datos.order))

        let pokemonO = new pokemon(datos.sprites.front_default, datos.name, datos.types[0].type.name, datos.order)
        pokeList.push(pokemonO)
        guardarPokeListEnLocalStorage();
        console.log(pokeList)



        pokemonesBuscados.style.display = "flex"





        switch (datos.types[0].type.name) {

            case "poison":
                bodystyle.style.background = "#F912C1"
                break
            case "water":
                bodystyle.style.background = "#12C8F9"
                break



            case "normal":
                bodystyle.style.background = "#C18463"
                break

            case "ghost":
                bodystyle.style.background = "#AD2BB6"
                break

            case "fire":
                bodystyle.style.background = "#E02711"
                break



            case "fighting":
                bodystyle.style.background = "#F67733"
                break


            case "electric":
                bodystyle.style.background = "rgb(193, 235, 8)"
                break

            case "grass":
                bodystyle.style.background = "#3ebf0f"
                break

            case "bug":
                bodystyle.style.background = "#69ad50"
                break

            case "dark":
                bodystyle.style.background = "#2a2e52"
                break
            case "dragon":
                bodystyle.style.background = "#1426b3"
                break
            case "rock":
                bodystyle.style.background = "#8a6108"
                break
            case "psychic":
                bodystyle.style.background = "#de0dd0"
                break




            default:
                bodystyle.style.background = "white"




        }




    } catch (error) {
        incorrecto.style.display = "flex"
        bodystyle.style.background = "black"
        setTimeout(() => {
            incorrecto.style.display = "none"


        }, 2500);

    }


}



let tiposPokemon = async function () {

    try {

        let poketipos = await fetch(`https:pokeapi.co/api/v2/type`)
        let datos = await poketipos.json()

        let tiposPokemonL = datos.results.map((tipo) => tipo.name);

        console.log(tiposPokemonL)



    } catch {
        console.log()
    }



}






btn.addEventListener("click", function () {
    if (input.value == "") {
        incorrecto.style.display = "flex"
        setTimeout(() => {
            incorrecto.style.display = "none"


        }, 2500);

    } else {
        cargarPokemon(input)
        informacion.style.display = "flex"





    }
})

tiposPokemon()
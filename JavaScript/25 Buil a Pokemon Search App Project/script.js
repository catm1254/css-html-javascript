const pokemonID = document.getElementById("pokemon-id");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const ImageContainer = document.getElementById("image-container");
const types = document.getElementById("types");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const pokemonName = document.getElementById("pokemon-name");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const searchInput = document.getElementById("search-input");
const searchBtn=document.getElementById("search-button");
const searchForm = document.getElementById("search-form");
const principalImage=document.getElementById("sprite")
 
// Delete all information to default      
const defaultStatus=()=>{
    searchInput.value="";
    specialAttack.innerText="";
    specialDefense.innerText="";
    speed.innerText="";
    height.innerText="";
    weight.innerText="";
    pokemonName.innerText="";
    hp.innerText=""; 
    attack.innerText="";
    defense.innerText="";
    pokemonID.innerText="";
    types.innerHTML="";
    ImageContainer.innerHTML="";
};

// function to Search Pokemon  
 
const pokemonSearch = async ()=>{

    try {
        const pokemonToSearch=searchInput.value.toLowerCase();
        const response= await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonToSearch}`);
        const pokemonInfo= await response.json(); 
        pokemonName.innerText=`${pokemonInfo.name}`;
        pokemonID.innerText=`${pokemonInfo.id}`;
        weight.innerText=`Weight: ${pokemonInfo.weight}`;
        height.innerText=`Height: ${pokemonInfo.height}`;
        types.innerHTML=pokemonInfo.types.map(element => {
            return `<span class="${element.type.name}">${element.type.name}</span> `;
        }).join("");
        ImageContainer.innerHTML=`<img id="sprite" class="image_principal" src="${pokemonInfo.sprites.front_default}" alt="${pokemonInfo.name}">`;
        hp.innerText=`${pokemonInfo.stats[0].base_stat}`; 
        attack.innerText=`${pokemonInfo.stats[1].base_stat}`;
        defense.innerText=`${pokemonInfo.stats[2].base_stat}`;
        specialAttack.innerText=`${pokemonInfo.stats[3].base_stat}`;
        specialDefense.innerText=`${pokemonInfo.stats[4].base_stat}`;
        speed.innerText=`${pokemonInfo.stats[5].base_stat}`;
        console.log(pokemonInfo);
    } catch (error) {
        defaultStatus();
        alert('Pokémon not found');
        
    }
};





searchForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    pokemonSearch();

})
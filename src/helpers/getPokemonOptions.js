import pokemonAPI from '../api/pokemonAPI';

const getPokemon = ()=>{

    const arrayPokemons = []

    while(arrayPokemons.length < 4){
        const number = Math.floor(Math.random() * 651) + 1;
        if (!(arrayPokemons.includes(number))) arrayPokemons.push(number);
    }
    return arrayPokemons
}
const getPokemonOptions = async ()=>{
    const mixedPokemons = getPokemon().sort();
    const pokemons = await getPokemonNames(mixedPokemons);
    return pokemons
}

const getPokemonNames = async ([p1, p2, p3, p4])=>{
    
    const promiseArr =[
        pokemonAPI.get(`/${p2}`),
        pokemonAPI.get(`/${p1}`),
        pokemonAPI.get(`/${p3}`),
        pokemonAPI.get(`/${p4}`)
    ]

    console.log(promiseArr)

    const [pokemon1,pokemon2,pokemon3,pokemon4] = await Promise.all(promiseArr)
        
    return [
        {name: pokemon1.data.name, id: pokemon1.data.id},
        {name: pokemon2.data.name, id: pokemon2.data.id},
        {name: pokemon3.data.name, id: pokemon3.data.id},
        {name: pokemon4.data.name, id: pokemon4.data.id},
    ]
}

export default getPokemonOptions
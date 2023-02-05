<template>
    <div v-if="!showPage">
        <label for="name" class="form-label">Introduce tu nombre:</label>
        <input type="text" id="name" class="form-input" v-model="name"/>
        <button class="form-button" @click="showPage = true">Continuar</button>
    </div>
    <div v-else>
        <h1 v-if="!pokemon">Cargando...</h1>
        <div v-else="pokemon">
            <h1>¿Cual es este pokemon?</h1>
            <PokemonPictures :pokemonId="this.pokemon.id" :showPokemon="showPokemon"  />
            <PokemonOptions :pokemons="pokemonsArray" @selection="checkPokemon"/>
            <PokemonScores :name="name" :score="score"/>
            <template v-if="showPokemon">
                <h2 class="fade-in">{{ message }}</h2>
                <button @click="newGame">Jugar de nuevo</button>
            </template>
        
        </div>
    </div>
</template>

<script>
    import PokemonScores from "@/components/PokemonScores.vue";
    import PokemonOptions from '@/components/PokemonOptions.vue';
    import PokemonPictures from '@/components/PokemonPictures.vue';
    import getPokemonOptions from '@/helpers/getPokemonOptions';

    export default {
        components: { PokemonPictures, PokemonOptions, PokemonScores},

        data(){
            //He añadido dos funciones, una tabla de puntuaciones y una pagina para escribir el nombre del jugador

            return {
                name: "",
                showPage:false,
                score: 0,
                pokemon: {},
                pokemonsArray: [],
                showPokemon:  false,
                showAnswer: false,
                message: '',
            }
            
        },
        methods: {
            async mixedPokemons(){
                this.pokemonsArray = await getPokemonOptions()
                const randomPokemon = Math.floor(Math.random() * 4)
                this.pokemon = this.pokemonsArray[randomPokemon]

            },
            checkPokemon(pokemonId){
                
                this.showPokemon = true
                this.showAnswer = true

                const condition = this.pokemon.id === pokemonId;
                if (condition){
                    this.message = 'Has acertado!!!'
                    this.score = this.score + 1
                }else{
                    this.message = `Ese no era, era ${this.pokemon.name}`
                    this.score = this.score - 1                    
                }

            },
            newGame(){
                this.pokemon=null,
                this.pokemonsArray=[],
                this.showPokemon= false,
                this.showAnswers=false,
                this.mixedPokemons()
            }
        },
        mounted(){
            this.mixedPokemons()

        }
    }
</script>

<style scoped>
    .form-label {
    display: block;
    margin-bottom: 10px;
  }

  .form-input {
    width: 50%;
    height: 30px;
    margin: 5px 0px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .form-button {
    width: 50%;
    height: 40px;
    margin: 5px 0px;
    background-color: #4ca5af;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .form-button:hover {
    background-color: #387b82;
  }
</style>
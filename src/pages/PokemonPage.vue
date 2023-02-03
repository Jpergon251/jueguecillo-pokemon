<template>
    <h1 v-if="!pokemon">Cargando...</h1>
    <div v-else="pokemon">
        <h1>¿Cual es este pokemon?</h1>
        <PokemonPictures :pokemonId="this.pokemon.id" :showPokemon="showPokemon"  />
        <PokemonOptions :pokemons="pokemonsArray" @selection="checkPokemon"/>
        <PokemonScores/>
        <template v-if="showPokemon">
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newGame">Jugar de nuevo</button>
        </template>
    
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
            return {
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
                }else{
                    this.message = `Ese no era, era ${this.pokemon.name}`                    
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

</style>
import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,

    loadMoreURL: "",
    pokemons: [],
    sortedPokemons: [],
    currentPokemon: null,
    favoritePokemons: []
}

// ------------------------------------------------------------------------ GET LIST ------------------------------------------------------------------------
// ------------------------------------------------------------------------ GET LIST ------------------------------------------------------------------------

export const getPokemonList = createAsyncThunk("pokedeck/getPokemonList", async () => {
    const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=100"

    try {
        const response = await axios.get(baseURL);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
})

// ------------------------------------------------------------------------ GET SINGLE ------------------------------------------------------------------------
// ------------------------------------------------------------------------ GET SINGLE ------------------------------------------------------------------------

export const getDetailsByURL = createAsyncThunk("pokedeck/getDetailsByURL", async (pokemonURL) => {
    
    try {
        let response;
        let tempArr = [];
            for(let i = 1; i < 100; i ++) {
                    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`
                response = await axios.get(url);
                tempArr.push(response.data)
                // console.log('----- GET DETAILS -----')
            }

            return tempArr;
        } catch (error) {
            return error.message;
        }
})

export const getDetailsByName = createAsyncThunk("pokedeck/getDetailsByName", async (pokemonQuery) => {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`

    try {
        const response = await axios.get(baseURL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
})

export const pokedeckSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            // Find the datapoint with highest amonst the favorite pokemons: abilities, etc

            // use this to make suggestions
        },
        filterPokemons: (state, action) => {
            let tempPokemons = state.sortedPokemons;

            console.log(action.payload)

            if (action.payload.searchQuery){
                const {searchQuery} = action.payload
                tempPokemons = tempPokemons.filter(pokemon => pokemon.name.includes(searchQuery.toLowerCase()))
                state.sortedPokemons = tempPokemons
            } else {
                state.sortedPokemons = state.pokemons
            }

            // let filtersArray = Array(action.payload)

            // if (filtersArray.) {
            //     filtersArray.forEach(filter => {
            //         tempPokemons = tempPokemons.filter(pokemon => pokemon.name.includes(filter.toLowerCase()))
            //         return tempPokemons
            //     })
                
                console.log(tempPokemons)  
        },
        setCurrentPokemon: (state, action) => {
            state.currentPokemon = action.payload
        },
        setFavorites: (state, action) => {
            let tempArr = state.favoritePokemons;
            const  {payload} = action
            
            let temp = tempArr.filter(pokemon => pokemon == payload )

            console.log(temp)
            
            if(temp.length == 0){
                tempArr.push(payload)
            } else {
                tempArr = tempArr.filter(pokemon => pokemon != payload)
            }
            state.favoritePokemons = tempArr
            console.log(state.favoritePokemons)
        }
            
    },
    extraReducers(builder) {
        builder
        // ------ GET LIST ------
        .addCase(getPokemonList.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getPokemonList.fulfilled, (state, action) => {
            state.loadMoreURL = action.payload.next
            
            const tempArr =  action.payload.results
            console.log(tempArr)

        })
        .addCase(getPokemonList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // ------ GET SINGLE BY URL ------
        .addCase(getDetailsByURL.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.pokemons = action.payload
            state.sortedPokemons = action.payload
            
            // state.currentPokemon = action.payload[0]
        })
    }
})

export const { setFavorites, filterPokemons, setCurrentPokemon } = pokedeckSlice.actions;

export const pokemonList = (state) => state.pokemon.pokemons;
export const sortedPokemonList = (state) => state.pokemon.sortedPokemons;
export const viewCurrentPokemon = (state) => state.pokemon.currentPokemon;
export const favorites = (state) => state.pokemon.favoritePokemons;


export default pokedeckSlice.reducer;
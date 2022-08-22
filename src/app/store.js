import { configureStore } from "@reduxjs/toolkit";
import pokedeckReducer from './pokedeckSlice';

export const store = configureStore({
    reducer: {
        pokemon: pokedeckReducer
    }
})
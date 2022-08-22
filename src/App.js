import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList, getDetailsByURL, viewCurrentPokemon, setCurrentPokemon } from './app/pokedeckSlice';

import PokemonList from './components/PokemonList';
import ControlBar from './components/ControlBar';
import DetailsCard from './components/DetailsCard';

const App = () => {
  const dispatch = useDispatch();

  const currentPokemon = useSelector(viewCurrentPokemon)

  useEffect(() => {
    // dispatch(getPokemonList())
    dispatch(getDetailsByURL())
  })



  return (
    <div className='relative flex justify-center items-center w-[100vw] h-[100vh] bg-blue border-2'>
      <ControlBar />
      <PokemonList />

      {currentPokemon != null && (
        <div className="z-[10] absolute flex justify-center items-center bg-gray-800/30 w-[100%] h-[100%] "
          onClick={() => dispatch(setCurrentPokemon(null))}
        >
          <DetailsCard pokemon={currentPokemon} />
        </div>
      )}
    </div>
  )
}

export default App

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList, sortedPokemonList, setCurrentPokemon } from "../app/pokedeckSlice";

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(sortedPokemonList);
  const [favorite, setFavorite] = useState();


//   console.log(pokemons[0]);

  return (
    <div className="relative flex flex-wrap justify-center bg-black h-[100vh] w-full overflow-y-scroll">
      {pokemons?.map((pokemon) => (
        <div
          key={pokemon.id}
          className="relative h-40 w-40 flex flex-col m-4 justify-evenly bg-gray-700/40 rounded-lg text-sand cursor-pointer"
          onClick={() => dispatch(setCurrentPokemon(pokemon))}
        >
          <div className="absolute w-full h-full bg-gray-900/20 hover:bg-zinc-10 z-[10] "></div>
          <div className="h-[60%] w-full flex justify-center items-center border-b z-0">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <h2>{pokemon.url}</h2>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;

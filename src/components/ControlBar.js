import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemons, favorites } from '../app/pokedeckSlice';

const ControlBar = () => {
  const dispatch = useDispatch()
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const favoritePokemons = useSelector(favorites);

  useEffect(() => {
    setFavorites(favoritePokemons)
  }, [favoritePokemons])

  const handleSearch = (e) => {
    const {value} = e.target
    setPokemonSearch(value)
    dispatch(filterPokemons({"searchQuery": value}))
  }

  return (
    <div className="flex flex-col p-2 w-80 h-full bg-amber-700/20">
      <form onSubmit={""}>
        <input
          className="w-full md:mt-3"
          type="text"
          value={pokemonSearch}
          placeholder="Seach Pokemons"
          onChange={(e) => handleSearch(e)}
        />
      </form>

      <div className="h-full w-full bg-black">
        {favorites?.map((pokemon, i) => {
          <div className="w-full h-20 border-b rounded bg-gray-800/50">
            <h1>{pokemon.name}</h1>
            <div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

export default ControlBar;

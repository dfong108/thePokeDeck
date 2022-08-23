import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemons, favorites, setCurrentPokemon, setFavorites } from '../app/pokedeckSlice';


const ControlBar = () => {
  
  const favs = useSelector(favorites)
  const dispatch = useDispatch()
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [favoritePokemons, setFavoritePokemons] = useState(favs)

  // useEffect(() => {
  //   let temp = window.localStorage.getItem(JSON.parse("favoritePokemons"))
  //   console.log(temp)
  //   // setFavoritePokemons(temp)
  // }, [])

  console.log(favs)


  const handleSearch = (e) => {
    const {value} = e.target
    setPokemonSearch(value)
    dispatch(filterPokemons({"searchQuery": value}))
  }

  return (
    <div className="flex flex-col p-2 w-80 h-full bg-amber-700/20">
      <div>
        <input
          className="w-full md:my-3"
          type="text"
          value={pokemonSearch}
          placeholder="Seach Pokemons"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <div className="h-full w-full  bg-black">
        {/* ----FAVORITES----- */}
        <section className="flex flex-col w-full h-[50%] pt-20">
          <h2 className="text-white font-accent text-[1.5rem]">Favorites</h2>
          {favs?.map((pokemon, i) => (
            <div className="relative flex w-full justify-between items-center p-2 h-10 border-b rounded bg-gray-800/80 text-poppins cursor-pointer" onClick={() => dispatch(setCurrentPokemon(pokemon))}>
              <div className="absolute h-full w-full z-[10] bg-gray-900/20 hover:hidden"></div>
              <h1 className="title">{pokemon.name}</h1>
              <div>
                <img className='h-10 object-contain' src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ControlBar;

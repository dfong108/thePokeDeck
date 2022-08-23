import {useState, useEffect} from 'react';
import { useDispatch, useSelector, nanoid } from 'react-redux';
import { setFavorites, favorites } from '../app/pokedeckSlice';

import {AiFillStar} from 'react-icons/ai';

const DetailsCard = ({ pokemon, pokemon: { name, abilities, height, weight, moves, types, sprites } }) => {

    const dispatch = useDispatch();
    const [currentImage, setCurrentImage] = useState(sprites.front_default)
    const [isFavorite, setIsFavorite] = useState(false)
    const capName = name.toUpperCase();

    const favoritePokemons = useSelector(favorites)

    useEffect(() => {
      setIsFavorite(favoritePokemons.includes(pokemon))
    
    }, [favoritePokemons])
    

    console.log(isFavorite)


  return (
    <div className='z-40 flex-col justify-center items-center md:p-4 p-2 w-[80%] h-[80%] rounded-lg text-zinc-200 font-mono shadow-2xl bg-gray-800/90'>
        <div className='flex justify-between items-center w-full min-h-fit'>
            <h1 className='title w-[100%] text-center'>{capName}</h1>
            <div className={isFavorite ? 'text-red cursor-pointer' :  'text-yellow cursor-pointer'}
                onClick={() => dispatch(setFavorites(pokemon))}
            >
                <AiFillStar size={40} />
            </div>
        </div>
{/* ------ SPRITES ------ */}
        <div className='flex images w-full  h-80 m-auto rounded-md overflow-hidden'>
            <div className='flex justify-center main-img h-full bg-black w-full'>
                <img src={currentImage} alt={name} />
            </div>
        </div>
{/* ------ ABILITIES ------ */}
        <div className='flex justify-between border-b rounded-sm p-3'>
            <div className=' w-[40%]'>
                <span>Abilities</span>
                <ul className='text-sm text-gray-400 list-disc p-2'>
                    {abilities?.map((ability => (
                        <li>{ability.ability?.name}</li>
                    )))}
                </ul>
            </div>
{/* ------ MOVES ------ */}
            <div className=' w-[40%]'>
                <span>Types</span>
                <ul className='text-sm text-gray-400 list-disc p-2'>
                    {types?.map((type => (
                        <li>{type.type?.name}</li>
                    )))}
                </ul>
            </div>
        
        </div>
    </div>
  )
}

export default DetailsCard
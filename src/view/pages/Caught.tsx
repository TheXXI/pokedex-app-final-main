import { useEffect, useState } from "react";
import { store } from "../../store/store";
import { Pokemon } from "../../model/model";
import { PockemonCard } from "../shared/card/PockemonCard";
import css from './pages.module.scss'

export const Caught = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>(store.caughtPokemons);

  useEffect(() => {
    store.lastLoadCountCaught = 0;
    setPokemons((store.caughtPokemons).slice(0, 20))
  },[])

  useEffect(() => {
      const handleScroll = () => {
          if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
              if (pokemons.length < store.caughtPokemons.length) {
              setPokemons(store.caughtPokemons.slice(0, 20 + store.lastLoadCountCaught))
              store.lastLoadCountCaught += 20;
              }
          }
      };

      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });

  return (
      <div className={css.pokemonsTable}>
          {pokemons &&
              pokemons.map(pokemon => ( <PockemonCard pokemon={pokemon} isMainPage={false} key={pokemon.id}/> ))
          }
          {pokemons.length === 0 && 
            <h4 className={css.pokemonsTable__notPokemons}>Ни один покемон пока не пойман.</h4>
          }
      </div>
    )
}
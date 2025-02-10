import css from './pages.module.scss'
import { useEffect, useState } from "react";
import { Loader } from "../shared/loader/Loader";
import { service } from '../../service/service';
import { store } from '../../store/store';
import { Pokemon } from "../../model/model";
import { PockemonCard } from '../shared/card/PockemonCard';
import { observer } from 'mobx-react-lite';

export const Main = observer(() => {
    const [isLoading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (store.pokemons.length === 0 && store.fetching) { 
            service.getPokemonsList().then(() => {
                setLoading(true);
            });
        } else if (store.pokemons.length !== 0) {
            setLoading(true);
        }
    },[])

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
                if (store.fetching) { 
                    setLoading(false);
                    service.getPokemonsList().then(() => {
                        setLoading(true);
                    });
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <div className={css.pokemonsTable}>
            {store.pokemons &&
                store.pokemons.map(pokemon => ( <PockemonCard pokemon={pokemon} isMainPage={true} key={pokemon.id}/> ))
            }
            {!isLoading && <Loader />}
        </div>
      )
})
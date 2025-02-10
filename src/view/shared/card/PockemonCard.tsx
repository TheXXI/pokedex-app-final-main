import { useState } from 'react';
import { Pokemon } from '../../../model/model';
import css from './card.module.scss'
import { service } from '../../../service/service';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface IPockemonCard {
    pokemon: Pokemon
    isMainPage: boolean
}

export const PockemonCard = observer(({ pokemon, isMainPage }: IPockemonCard) => {
    const [caught, setCaught] = useState<boolean>(pokemon.isCaught);

    const catchPokemon = (id: number | undefined) => () => {
        if (!id) return;
        service.handleCaught(id);
        setCaught(!caught);
    }
    
    return (
        <div className={css.pokemonCard}>
            <Link to={`/pokemon/${pokemon.id}`}>
                <div className={css.pokemonCard__avatar}>
                    <img src={pokemon.avatar} className={css.pokemonCard__avatar} />
                </div>
                <span className={css.pokemonCard__name}>{pokemon.name}</span><br />
                <span className={css.pokemonCard__identifier}>Id: {pokemon.id}</span>
            </Link>
            {isMainPage &&
                <button disabled={caught} onClick={catchPokemon(pokemon.id)}>{
                    caught ? 'Пойман' : 'Поймать!'
                }</button>
            }
            {(caught && !isMainPage) && <span className={css.pokemonCard__caught}>Пойман: {pokemon.date}</span>}
        </div>
      )
})
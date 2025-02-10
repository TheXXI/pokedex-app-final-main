import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pokemon } from "../../../model/model";
import { service } from "../../../service/service";
import { store } from "../../../store/store";
import { Loader } from "../../shared/loader/Loader";
import css from './detail.module.scss'

export const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState <Pokemon>();
    const { identifier } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const resreceivedPokemon = service.getPokemonById(Number(identifier));
        if (resreceivedPokemon) setPokemon(resreceivedPokemon)
        else {
            if (store.fetching) { 
                setLoading(false);
                service.loadPokemonById(Number(identifier)).then((result) => {
                    setLoading(true);
                    setPokemon(result);
                });
            }   
        }
    },[identifier])

    const goBack = () => navigate(-1);

    let ability = '';
    pokemon?.abilities.forEach((element, index) => {
        if(index > 0) ability += ', ';
        ability += Object.values(element)[0].name;
    })

        return (
            <>
                 {!isLoading && <Loader />}
                 {isLoading && 
                    <div className={css.pokemon}>
                        <div className={css.pokemon__avatar}>
                            <img src={pokemon?.avatar} alt={pokemon?.name}/>
                        </div>
                        <div className={css.details}>
                            <h4 className={css.details__name}>{pokemon?.name}</h4>
                            <span className={css.details__identifier}>Id: {pokemon?.id}</span>
                            <span className={css.details__abilities}>Способности: {ability}</span>
                            
                            {pokemon?.isCaught ? (
                                <span className={css.details__caught}>Покемон пойман, дата поимки: {pokemon?.date}</span>
                            ) : (
                                <span className={css.details__caught}>Покемон не был пойман.</span>
                            )}
                        </div>
                    </div>
                 }
                 <button onClick={goBack}>Назад</button>
            </>
        )
}
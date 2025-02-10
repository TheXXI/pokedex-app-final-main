import { IService, Pokemon } from "../model/model";
import { store } from "../store/store";
import { FetchPokemons } from "../transport/transport";

class Service implements IService{

    public async getPokemonsList(): Promise<void> {
        if (store.fetching && store.shouldLoad) {
            store.setFetching(false);
            let response = await this.fetchPokemons.getPokemonsList(store.next);
            const data = Object.values(response)[0]
            store.setNext(data.next);
            if (!store.next) {
                store.setShouldLoad(false);
            }
            const result = data.results;

            const newPokemons: Pokemon[] = [];
            for (let i = 0; i < result.length; i++) {
                const currentPokemon = await this.fetchPokemons.getDefinitePokemonByUrl(result[i].url);
                const data = Object.values(currentPokemon)[0]
        
                const isCaught: Pokemon | undefined = store.caughtPokemons ? store.caughtPokemons.find(pokemon => pokemon.id === data.id) : undefined;

                newPokemons.push({
                    id: data.id,
                    name: data.name,
                    avatar: data.sprites.other.home.front_default,
                    isCaught: isCaught !== undefined,
                    abilities: Object.values(data.abilities),
                    date: ''
                })
            }   
            store.addPokemons(newPokemons);
            store.setFetching(true);
        }
    }

    public handleCaught (id: number): void {

        if (store.pokemons.find(pokemon => pokemon.id === id)) {
            store.caughtPokemon(id);
            localStorage.setItem('caughtPokemons', JSON.stringify(store.caughtPokemons));
        }
    };
    
    public initCaughtPokemons (): void {
        const storage = localStorage.getItem('caughtPokemons');
        if (storage) store.initCaughtPokemons(JSON.parse(storage));
    }

    public getPokemonById(id: number) {
        let pokemon = store.caughtPokemons.find(pokemon => pokemon.id === id);
        if(pokemon) return pokemon
        pokemon = store.pokemons.find(pokemon => pokemon.id === id);
        if (pokemon) return pokemon
    }

    public async loadPokemonById(id: number): Promise<Pokemon> {
        store.setFetching(false);
        const response = await this.fetchPokemons.getDefinitePokemonById(id);
        const data = Object.values(response)[0]
        store.setFetching(true);
        return {
            id: data.id,
            name: data.name,
            avatar: data.sprites.other.home.front_default,
            isCaught: false,
            abilities: data.abilities,
            date: ''
       }
    }

    public setLastLoadCountCaught(num: number) {
        store.setLastLoadCountCaught(num);
    }

    constructor(
        private fetchPokemons: FetchPokemons
    ) {}
}

export const service: Service = new Service(
    new FetchPokemons()
)
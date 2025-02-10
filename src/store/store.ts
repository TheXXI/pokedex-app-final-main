// Add all objects with data into this directory
import { makeAutoObservable } from "mobx";
import { IStore, Pokemon } from "../model/model";
import { formatDate } from "../utils/formatDate";

class Store implements IStore {
    public lastLoadCountCaught: number = 0;
    public next: string = "";
    public pokemons: Pokemon[] = [];
    public caughtPokemons: Pokemon[] = [];
    public fetching: boolean = true;
    public shouldLoad: boolean = true
    ;
    constructor () {
        makeAutoObservable(this)
    }

    setLastLoadCountCaught(num: number) {
        this.lastLoadCountCaught = num;
    }

    setNext(str: string) {
        this.next = str;
    }

    setFetching(value: boolean) {
        this.fetching = value;
    }

    setShouldLoad(value: boolean) {
        this.shouldLoad = value;
    }

    addPokemons(pokemons: Pokemon[]) {
        this.pokemons = this.pokemons.concat(pokemons)
    }

    caughtPokemon(id: number) {
        this.pokemons = this.pokemons.map(pokemon => pokemon.id === id ? {...pokemon, isCaught: true} : pokemon);
        let pokemon = this.pokemons.find(pokemon => pokemon.id === id);
        pokemon.isCaught = true;   
        pokemon.date = formatDate(new Date());
        this.caughtPokemons.push(pokemon);
    }

    initCaughtPokemons(pokemons: Pokemon[]) {
        this.caughtPokemons = pokemons;
    }
}

export const store = new Store();
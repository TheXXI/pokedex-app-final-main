// Add all interfaces into this directory

export interface Pokemon {
    id: number,
    name: string,
    avatar: string,
    isCaught: boolean
    abilities: object[],
    date: string;
}

export interface IStore {
    lastLoadCountCaught: number,
    next: string,
    pokemons: Pokemon[],
    caughtPokemons: Pokemon[],
    fetching: boolean,
    shouldLoad: boolean,

    setLastLoadCountCaught(num: number): void,
    setNext(str: string): void,
    setFetching(value: boolean): void,
    setFetching(value: boolean): void,
    setShouldLoad(value: boolean): void,
    addPokemons(pokemons: Pokemon[]): void,
    caughtPokemon(id: number): void,
    initCaughtPokemons(pokemons: Pokemon[]): void
}

export interface IService {
    getPokemonsList(): Promise<any>,
    handleCaught (id: number): void,
    initCaughtPokemons (): void
}
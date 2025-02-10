// Add all transport classes with api requests into this directory
import axios from "axios";

export class FetchPokemons {

    private deafultUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
    private deafultDefiniteUrl (id: number): string { 
        return `https://pokeapi.co/api/v2/pokemon/${id}`
    }
    
    public getPokemonsList(url?: string): Promise<object> {
        if (url && url != '') return axios.get(url)
        return axios.get(this.deafultUrl);
    }   

    public getDefinitePokemonByUrl(url: string): Promise<object> {
        return axios.get(url);
    }

    public getDefinitePokemonById(id: number): Promise<object> {
        return axios.get(this.deafultDefiniteUrl(id));
    }
}
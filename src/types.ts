export interface IPokemonSprites {
    front_default: string;
}

export interface IPokemonAbilities {
    ability: {name: string; url: string};
    is_hidden: boolean;
    slot: number;
}


export interface IPokemon {
    name: string;
    sprites: IPokemonSprites;
    abilities: IPokemonAbilities[];
}
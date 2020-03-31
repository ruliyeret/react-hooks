import { useHttp } from "./http";

interface CharacterType {
    name: string,
    height: string,
    hair_color: string,
    skin_color: string,
    gender: string,
    films: string[]
  };

interface CharacterList {
    results: CharacterType[]
}


export class CharacterFetcher {
    public static tryFetchSelectedChar(selectedChar : number) : [boolean, CharacterType?] {
        return useHttp<CharacterType>('https://swapi.co/api/people/' + selectedChar, [selectedChar])
    }

    public static tryFetchAllChars() : [boolean, CharacterList?] {
        return useHttp<CharacterList>('https://swapi.co/api/people', [])
    }
}
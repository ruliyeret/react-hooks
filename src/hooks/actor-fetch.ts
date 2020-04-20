import { useHttp } from "./http";

interface ActorType {
    name: string,
    height: string,
    hair_color: string,
    skin_color: string,
    gender: string,
    films: string[]
  };

interface ActorList {
    results: ActorType[]
}


export default class ActorFetcher {
    public static tryFetchSelectedChar(selectedChar : number) : [boolean, ActorType?] {
        return useHttp<ActorType>('https://swapi.co/api/people/' + selectedChar, [selectedChar])
    }

    public static tryFetchAllChars() : [boolean, ActorList?] {
        return useHttp<ActorList>('https://swapi.co/api/people', [])
    }
}
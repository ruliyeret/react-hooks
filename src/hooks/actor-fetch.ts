import { useHttp } from "./http";
import {useQuery} from "@apollo/react-hooks";
import Queries from "../apollo/queries";

export interface ActorType {
    name: string,
    height: string,
    gender: string,
    actorId: number,
    movieCount: number
  };

export interface ActorList {
    results: ActorType[]
}


export default class ActorFetcher {
    public static tryFetchSelectedChar(selectedChar : number) : [boolean, ActorType?] {
        return useHttp<ActorType>('https://swapi.co/api/people/' + selectedChar, [selectedChar])
    }

    public static getAllActors(){
        return useQuery(Queries.GET_ALL_ACTORS);
    }
}
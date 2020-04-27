import gql from "graphql-tag";

export default class Queries{

    static GET_ALL_ACTORS = gql`
    {
         Actors{
            name
            actorId
            gender
            height
            movieCount
        }
    }`;

    static GET_ACTOR_BY_NAME = gql`
        query ActorByName($actorName: String){
                ActorByName(name: $actorName){
                     name
                     actorId
                     gender
                }
                     height
            }
        
    `;

    static ADD_ACTOR = gql`
          mutation AddActor(
                 $actorId: Int!, $name: String!, $movieCount: Int, $height: String, $gender: String) {
            AddActor(
                actorId: $actorId, name: $name, movieCount: $movieCount, height: $height, gender: $gender) {
              name
            
            }
          }`;

    static DELETE_ACTOR_BY_NAME = gql`
        mutation deleteActorByName($name: String){
            deleteActorByName(name: $name){
            name
            }
        }
    `
}
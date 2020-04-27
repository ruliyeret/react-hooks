import React, {useState} from 'react';
import ActorFetcher, {ActorType} from '../hooks/actor-fetch';
import './ActorPicker.css';
import { isUndefined } from 'util';

export type Sides = 'light' | 'dark';


const ActorPicker = (props:any) => {
  const {loading, data, error} = ActorFetcher.getAllActors();
  const [firstTime, setFirstTime] = useState<boolean>(true);
    const selectedActors = !isUndefined(data)
      ? data.Actors.map((actor:ActorType) => ({
            name: actor.name,
            id: actor.actorId,
            gender: actor.gender,
            height: actor.height,
            movieCount: actor.movieCount
      }))
      : [];

  let content = <p>Loading actors...</p>;
    if(error){
        content = <p>error {error.message}</p>;
    }
  if (!loading && selectedActors && selectedActors.length > 0) {
      if(firstTime) {
          const firstActor = selectedActors[0];
          // props.onActorSelect(selectedActors[0].name);
          props.selectedActor({"name": firstActor.name,
              "height": firstActor.height,
              "gender": firstActor.gender,
              "actorId": firstActor.actorId,
              "movieCount": firstActor.movieCount});
          setFirstTime(false);
      }
    content = (
        <select
            onChange = {(event)=>
                props.selectedActor(selectedActors.find((name:string) => name == event.target.value))}
            value={props.currentActor.name}
            className={props.side}
        >
          {selectedActors.map((actor:ActorType) => (
              <option>
                {actor.name}
              </option>
          ))}
        </select>
    );
  } else if (
      !loading &&
      (!selectedActors || selectedActors.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default ActorPicker;
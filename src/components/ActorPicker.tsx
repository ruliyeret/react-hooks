import React from 'react';
import ActorFetcher, {ActorType} from '../hooks/actor-fetch';
import './ActorPicker.css';
import { isUndefined } from 'util';

export type Sides = 'light' | 'dark';

type ActorPickerProps = {
  side: Sides;
  selectedActor: number;
  onActorSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ActorPicker = (props:any) => {
  const {loading, data, error} = ActorFetcher.getAllActors();

    const selectedActors = !isUndefined(data)
      ? data.Actors.map((actor:ActorType) => ({
        name: actor.name,
        id: actor.actorId
      }))
      : [];

  let content = <p>Loading actors...</p>;
    if(error){
        content = <p>error {error.message}</p>;
    }
  if (!loading && selectedActors && selectedActors.length > 0) {
    content = (
        <select
            onChange={props.onActorSelect}
            value={props.selectedActor}
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
import React, { useEffect } from "react";
import Summary from './Summary';
import { isUndefined } from 'util';
import ActorFetcher from "../hooks/actor-fetch"

const Actor = (props : {selectedChar: number}) => {

  const [isLoading, fetchedData] =  ActorFetcher.tryFetchSelectedChar(props.selectedChar);

  let loadedActor;

  if (!isUndefined(fetchedData)) {
    loadedActor = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  let content = <p>Loading Actor...</p>;

  if (!isLoading && loadedActor) {
    content = (
        <Summary
            name={loadedActor.name}
            gender={loadedActor.gender}
            height={loadedActor.height}
            movieCount={loadedActor.movieCount}
        />
    );
  } else if (!isLoading && !loadedActor) {
    content = <p>Failed to fetch Actor.</p>;
  }
  return content;
};

export default React.memo(Actor);
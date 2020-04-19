import React, { useEffect } from 'react';

import { CharacterFetcher } from "../hooks/character-fetch";

import Summary from './Summary';
import { isUndefined } from 'util';

const Character = (props : {selectedChar: number}) => {

  const [isLoading, fetchedData] = CharacterFetcher.tryFetchSelectedChar(props.selectedChar);

  let loadedCharacter;

  if (!isUndefined(fetchedData)) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
        <Summary
            name={loadedCharacter.name}
            gender={loadedCharacter.gender}
            height={loadedCharacter.height}
            hairColor={loadedCharacter.colors.hair}
            skinColor={loadedCharacter.colors.skin}
            movieCount={loadedCharacter.movieCount}
        />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
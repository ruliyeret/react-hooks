import React from 'react';

import { CharacterFetcher } from "../hooks/character-fetch";

import './CharPicker.css';
import { isUndefined } from 'util';

export type Sides = 'light' | 'dark';

type CharPickerProps = {
  side: Sides;
  selectedChar: number;
  onCharSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CharPicker = (props : CharPickerProps) => {
  const [isLoading, fetchedData] = CharacterFetcher.tryFetchAllChars();

  const selectedCharacters = !isUndefined(fetchedData)
      ? fetchedData.results.slice(0, 5).map((char, index) => ({
        name: char.name,
        id: index + 1
      }))
      : [];

  let content = <p>Loading characters...</p>;

  if (!isLoading && selectedCharacters && selectedCharacters.length > 0) {
    content = (
        <select
            onChange={props.onCharSelect}
            value={props.selectedChar}
            className={props.side}
        >
          {selectedCharacters.map(char => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
          ))}
        </select>
    );
  } else if (
      !isLoading &&
      (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
import React from 'react';

import './Summary.css';

type SummaryProps = {
    name: string;
    gender: string;
    height: string;
    hairColor: string;
    skinColor: string;
    movieCount: number;
}

const Summary = (props : SummaryProps) => {
  return (
    <div className="summary">
      <h1>{props.name}</h1>
      <p>
        Gender: <span className="summary__output">{props.gender}</span>
      </p>
      <p>
        Height: <span className="summary__output">{props.height}</span>
      </p>
      <p>
        Hair Color / Skin Color:{' '}
        <span className="summary__output">{props.hairColor}</span> /{' '}
        <span className="summary__output">{props.skinColor}</span>
      </p>
      <p>
        Appears in # Movies:{' '}
        <span className="summary__output">{props.movieCount}</span>
      </p>
    </div>
  );
};

export default Summary;

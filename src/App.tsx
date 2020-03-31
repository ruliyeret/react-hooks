import React, { useState } from 'react';

import CharPicker, { Sides } from './components/CharPicker';
import Character from './components/Character';

const App = () => {

    const [destroyed, setDestroyed] = useState(false);

    const [selectedCharacter, setSelectedCharacter] = useState(1);

    const [chosenSide, setChosenSide] = useState<Sides>('light');

    const charSelectHandler = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const charId : number = parseInt(event.target.value);
        setSelectedCharacter(charId);
    };

    const destructionHandler = () => {
        setDestroyed(true);
    };

    let content = (
        <React.Fragment>
            <CharPicker
                side={chosenSide}
                selectedChar={selectedCharacter}
                onCharSelect={charSelectHandler}
            />
            <Character selectedChar={selectedCharacter} />
            <button onClick={() => setChosenSide('light')}>Light Side</button>
            <button onClick={() => setChosenSide('dark')}>Dark Side</button>
            {chosenSide === 'dark' && (
                <button onClick={destructionHandler}>DESTROY!</button>
            )}
        </React.Fragment>
    );

    if (destroyed) {
        content = <h1>Game Over!</h1>;
    }
    return content;
};

export default App;


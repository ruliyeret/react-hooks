import CharPicker, { Sides } from './components/CharPicker';

import React, { useState } from 'react';
import Actor from './components/Actor';
import AddForm from "./components/from";

const App = () => {

    const [destroyed, setDestroyed] = useState(false);
    const [added, setAddButton] = useState(false);

    const [selectedActor, setSelectedActor] = useState(1);

    const [chosenSide, setChosenSide] = useState<Sides>('light');

    const charSelectHandler = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const charId : number = parseInt(event.target.value);
        setSelectedActor(charId);
    };

    const addActor = () =>{
        setAddButton(!added)
    }

    const destructionHandler = () => {
        setDestroyed(true);
    };

    let content = (
        <React.Fragment>
            <CharPicker
                side={chosenSide}
                selectedChar={selectedActor}
                onCharSelect={charSelectHandler}
            />
            <Actor selectedChar={selectedActor} />
            <button onClick={() => setChosenSide('light')}>Light Side</button>
            <button onClick={() => setChosenSide('dark')}>Dark Side</button>
            <button onClick={addActor}>Add Actor</button>
            {chosenSide === 'dark' && (
                <button onClick={destructionHandler}>DESTROY!</button>
            )}
            {added && (<AddForm/>)}
        </React.Fragment>
    );
    if (destroyed) {
        content = <h1>Game Over!</h1>;
    }
    return content;
};

export default App;


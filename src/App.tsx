import React, {useEffect, useState} from 'react';

import ActorPicker, { Sides } from './components/ActorPicker';
import Actor from './components/Actor';
import AddForm from "./components/AddFrom";
import {ActorType} from "./hooks/actor-fetch";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import queries from "./apollo/queries";


const App = () => {

    const [destroyed, setDestroyed] = useState<boolean>(false);
    const [added, setAddButton] = useState<boolean>(false);
    const [currentActor, setActor] =useState("")
    const [showActorList, setActorList] = useState<boolean>(false);
    const [chosenSide, setChosenSide] = useState<Sides>('light');
    const  [getActorByName, {called, error, data, loading}] = useLazyQuery(queries.GET_ACTOR_BY_NAME);
    const [deleteCurrentActor, {data: queryMutaion, error:queryMutation}] =
        useMutation(queries.DELETE_ACTOR_BY_NAME);

    const [actorSelected, setActorSelected] = useState(false);

    const actorSelectHandler = (name: string) => {
        setActor(name);
        setActorSelected(true);
        getActorByName({variables: {actorName: name}});
    };

    const getDefaultActor = ():ActorType =>{
        const actor = {
            name: "",
            height: "",
            gender: "",
            actorId: 0,
            movieCount: 0
        }
        return actor;
    }
    const [selectedActor, setSelectedActor] = useState<ActorType>(getDefaultActor());
    const addActor = () =>{
        setAddButton(!added)
    }

    const destructionHandler = () => {
        setDestroyed(true);
    };


    const actorListHandler = () =>{
        setActorList(!showActorList);
    };


    if(called && !loading) {
        console.log("Called: " + called + " loading" + loading);
        if (actorSelected) {
            setSelectedActor(data.ActorByName);
            setActorSelected(false);

        }
    }

    const deleteActor = () => {
        deleteCurrentActor({variables:{name: currentActor}});
    }

    let content = (
        <React.Fragment>
            <ActorPicker
                selectedActor={setSelectedActor}
                side={chosenSide}
            />
            <Actor actor  = {selectedActor}/>
            <button onClick={() => setChosenSide('light')}>Light Side</button>
            <button onClick={() => setChosenSide('dark')}>Dark Side</button>
            <button onClick={addActor}>Add Actor</button>
            {chosenSide === 'dark' && (
                <button onClick={destructionHandler}>DESTROY!</button>
            )}
            {added && (<AddForm/>)}
            <button onClick={deleteActor}>delete Actor</button>
            <button onClick={actorListHandler}>Get Actor List</button>

        </React.Fragment>
    );
    if (destroyed) {
        content = <h1>Game Over!</h1>;
    }

    return content;
};

export default App;


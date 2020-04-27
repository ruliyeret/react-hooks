
import React from "react"
import Actor from "./Actor";
import AddForm from "./AddFrom";

const ButtonSection = (props: any) =>{


    return (
        <React.Fragment>
        <button onClick={() => props.setChosenSide('light')}>Light Side</button>
        <button onClick={() => props.setChosenSide('dark')}>Dark Side</button>
    <button onClick={props.addActor}>Add Actor</button>
    {props.chosenSide === 'dark' && (
        <button onClick={props.destructionHandler}>DESTROY!</button>
    )}
    {props.added && (<AddForm/>)}
    <button onClick={props.deleteActor}>delete Actor</button>
        </React.Fragment>

)
}
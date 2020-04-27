import React from "react"

const NewActorPicker = (props: any) =>{

    let  selectContent = (<select onChange={(event) => props.changeCurrentActor(event.target.value)}>
                            {props.listOfActors.map((actor) =>{
                                  return (<option>{actor.name}</option>)}
                                  )}
                        </select>);

    return (selectContent);


}

export default NewActorPicker;
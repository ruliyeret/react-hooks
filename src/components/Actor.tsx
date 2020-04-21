import React from "react";
import Summary from './Summary';
import  {ActorType} from "../hooks/actor-fetch"

const Actor = (props : {actor: ActorType}) => {

  return (<Summary
          name={props.actor.name}
          gender={props.actor.gender}
          height={props.actor.height}
          movieCount={props.actor.movieCount}
      />
  )
};

export default React.memo(Actor);
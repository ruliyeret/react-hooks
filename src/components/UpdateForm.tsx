import React from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/react-hooks";
import queries from "../apollo/queries";

const UpdateForm = (props) => {
    const {register, handleSubmit} = useForm();
    const [update, { data , error}] = useMutation(queries.UPDATE_ACTOR_NAME_BY_ID);

    if(data){
        props.refetchAgain();
    }

    const onSubmit = (actor) => {
        update({ variables: {name: actor.name, actorId: props.id}});
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} >
            <input name="name"  placeholder={"name"} ref={register}/>
            <input type="submit" />
        </form>
    )
}

export default UpdateForm
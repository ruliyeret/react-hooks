import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from "@apollo/react-hooks";
import queries from "../apollo/queries";

export default function AddForm(){
    //
 const {register, handleSubmit} = useForm();


    const [addActor, { data , error}] = useMutation(queries.ADD_ACTOR);


    // @ts-ignore
    const onSubmit = (actorToAdd) => {
         console.log(actorToAdd);
         addActor({ variables: {
                 actorId: parseInt(actorToAdd.actorId),
                 name: actorToAdd.firstName,
                 movieCount: parseInt(actorToAdd.movieCount),
                 height: actorToAdd.height,
                 gender: actorToAdd.gender,
             }});
        if(data){
            console.log("sdad");
        }
        if(error){
            console.log(error.message);
        }
    };


    return (<form onSubmit={handleSubmit(onSubmit)} >
        <input name="actorId" type="text" placeholder={"ID"} ref={register}/>
      <input name="firstName"  placeholder={"first name"} ref={register}/>

            <select name="gender" ref={register}>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>

            <input name="height" placeholder={"height"} ref={register}/>
            <input name="movieCount"  placeholder={"movie count:"} ref={register}/>
        <input type="submit" />
    </form>)
}
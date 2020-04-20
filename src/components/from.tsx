
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag"

export default function AddForm(){

    const {register, handleSubmit} = useForm();

    const ADD_ACTOR = gql`
          mutation AddActor(&id: Number! , $name: String!, 
                            $height: String!, $gender: String!,     
                            $movieCount: Number!) {
            addActor(id: $id, name: $name!, height: $height,
                      $gender: $gender, $movieCount: $movieCount) {
              id
              name
              gender
              height
              movieCount 
            }
          }`;
    const [addTodo, { data }] = useMutation(ADD_ACTOR);


    // @ts-ignore
    const onSubmit = (data) => {
        data.id  = Math.floor(Math.random() * 1156465465) + 1;
        addTodo({ variables: { id: data.id, name:data.name, height: data.height,
            gender: data.gender, movieCount: data.movieCount} });

        console.log(data)
    }


     const addCharacter = () => {
        // mutation to greaphql

    }
    return (  <form onSubmit={handleSubmit(onSubmit)}>
        <label> name:<input name="firstName" ref={register} /></label>
        <label> gender:
            <select name="gender" ref={register}>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
        </label>
        <label>height:
            <input name="height" ref={register} />
        </label>
        <label>movie count:
            <input name="movieCount" ref={register} />
        </label>
        <input type="submit" />
    </form>)
}
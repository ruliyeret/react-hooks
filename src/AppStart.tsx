import React, {useEffect, useState} from "react"
import Actor from "./components/Actor";
import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import Queries from "./apollo/queries";
import {ActorType} from "./hooks/actor-fetch";
import NewActorPicker from "./components/NewActorPicker";
import AddForm from "./components/AddFrom";
import EventLog from "./components/EventLog";



const getDefaultActor = ():ActorType =>{
    const actor = {
            name: "",
            height: "",
            gender: "",
            actorId: 0,
            movieCount: 0
        }
        return actor;
    };

const AppStart = () =>{

    const {data, loading, error, refetch} = useQuery(Queries.GET_ALL_ACTORS);
    const [content, setContent] = useState(<div> loading..</div>)
    const [currentActor, setCurrentActor] = useState(getDefaultActor);
    const [showForm,  setShowForm] = useState<boolean>(false);
    const [ deleteActorMutation, { data:deleteData , error:deleteError}] = useMutation(Queries.DELETE_ACTOR_BY_NAME);

    const  changeCurrentActor = (name: string) => {
        let actorChosen = data.Actors.find(actor => actor.name  == name);
        if(actorChosen){
            setCurrentActor(actorChosen);
        }
    }




    useEffect(() =>{
        if(error){
            setContent(<div> error while fetch data</div>);
        }
        if(!loading && data && data.Actors.length > 0) {
            setContent(<React.Fragment>
                <NewActorPicker
                    changeCurrentActor = {changeCurrentActor}
                    listOfActors = {data.Actors}
                />
            </React.Fragment>);
            setCurrentActor(data.Actors[0]);
        }
    }, [data]);

    const refetchAgain = () =>{
        refetch();
    }
    const deleteActor = (actor)=> {
        deleteActorMutation({variables: {
            name:actor.name}})
    }

    // if delete actor then fetch the data again
    if(deleteData){
        refetch();
    }

    return(
        <React.Fragment>
            {content}
            <Actor actor={currentActor}/>
            <button onClick={() => setShowForm(!showForm)}>Add Actor</button>
            <button onClick={ () => deleteActor(currentActor)}>Delete Actor</button>
            {showForm && <AddForm refetchAgain = {refetchAgain}/>}

            <EventLog/>

        </React.Fragment>
    )
};

export default  AppStart;
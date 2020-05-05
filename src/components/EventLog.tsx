import React, {useEffect, useState} from "react"
import TextField from "@material-ui/core/TextField";
import {useSubscription} from "@apollo/react-hooks";
import Queries from "../apollo/queries";



const EventLog = (props) =>{
    const {data:subscribeData, error:subscribeError, loading:subscribeLoading} =
            useSubscription(Queries.SUBSCRIPTION_ACTOR_ADD_EVENT,{
                onSubscriptionData: ({subscriptionData}) =>{
                   handleAddingEvent(subscriptionData.data.addActor);
                }
            });
    const {data:deletesubscribeData, error:deletesubscribeError, loading:deletesubscribeLoading} =
            useSubscription(Queries.SUBSCRIPTION_ACTOR_DELETE_EVENT);
    const [ flag, setFlag] = useState(true);
    const[ eventList, setEventList]  = useState(new Array());

    const handleAddingEvent = (newActor) =>{
        let message:string  = getDate() + "added actor name " + newActor.name + "\n";
        let tempEventList = eventList;
        tempEventList.push(message);
        setEventList(tempEventList);
    }
    const getDate = () => {
        return  new Date().toISOString() + ": ";
    }


    if(deletesubscribeData){
        // Get the data out and set up the event log section
    }

    const getEventList = () => {
        return eventList.join();
    }

    useEffect(() => {
        setFlag(false);
    },[eventList])
    return(
        <div>
            <br></br>
            <TextField
                id="outlined-multiline-flexible"
                fullWidth
                label="Event Log"
                multiline
                value={ getEventList()}
            ></TextField>

        </div>

    );
}



export default EventLog;
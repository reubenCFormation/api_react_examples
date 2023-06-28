import react,{useState,useEffect} from "react";
import {useParams,useNavigation} from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import Header from "./Header";

const Event=()=>{
    const params=useParams();
    const [event,setEvent]=useState("");
    const [participants,setParticipants]=useState([]);
    const [successMsg,setSucessMsg]=useState("");

    const getData=()=>{
        axios.get("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/event_catalogue/viewEvent.php?eventId="+params.eventId,{headers:{Authorization:"Bearer "+cookie.get("token")}}).then((response)=>{
            console.log("GET RESPONSE");
            console.log(response.data);
            setEvent(response.data.event);
            setParticipants(response.data.participants);
            
            //console.log(response.data.);

        }).catch((error)=>{
            console.log("get error");
            console.log(error);
        })
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <>
           <Header/>
           {successMsg? <div class="alert alert-success"> {successMsg}</div> :<span></span>}
            <h2 class="text-center"> Details de l'evenment</h2>
            <h4 class="text-info"> Titre: {event.title}</h4>
            <h4 class="text-info">Date: {event.registration_date}</h4>
            <h5 class="text-info"> Creé par: {event.firstname} {event.lastname}</h5>
            <p class="text-info"> Description: {event.description}</p>

            

            {participants.length>0 ?
            <>
              <h4> Participants  </h4>
                <ul class="list-group">
                    {participants.map((participant)=>{
                     return   <li class="list-group-item"> {participant.firstname} {participant.lastname}</li>
                    })}
                </ul>
                </>
             :<span> </span>}

             {participants.length< event.capacity ? <button onClick={()=>{
               
                const dataToSend={eventId:event.id}
                axios.post("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/event_catalogue/bookTicket.php",dataToSend,{headers:{Authorization:"Bearer "+cookie.get("token")}}).then((response)=>{
                    console.log("GET RESPONSE");
                    console.log(response);
                    setSucessMsg(response.data.message);
                    getData();
                }).catch((error)=>{
                    console.log("get error");
                    console.log(error);
                })

             }} class="btn btn-primary"> Reserver une palce</button> : <div class="text-center text-warning"> Evenment complet!</div> }
            

        </>

        

    )
}

export default Event;
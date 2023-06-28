import react,{useEffect,useState} from "react";
import Header from "./Header"
import cookie from "js-cookie";
import axios from "axios";
import {Link} from "react-router-dom";

const Events=()=>{
    const [events,setEvents]=useState([]);

    const getData=()=>{
        axios.get("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/event_catalogue/events.php",{headers:{Authorization:"Bearer "+cookie.get("token")}}).then((response)=>{
            console.log("get response");
            console.log(response);
            setEvents(response.data.events);
        }).catch((error)=>{
            console.log("get error");
            console.log(error);
        });
    }

    useEffect(()=>{
        getData();
    },[]);
    return (
        <>
        <Header/>
        <h4 class="text-center"> Les Evenments!</h4>
        <div class="d-flex flex-wrap">
            {events.map((event)=>{
                return(
                    <div class="card col-3 m-3">
                   
                    <div class="card-body">
                      <h5 class="card-title"> Titre:{event.title}</h5>
                      <h5 class="card-title"> Categorie: {event.category}</h5>
                      <h5> Date: Date: {event.registration_date}</h5>
                      <p class="card-text">{event.description}.</p>
                      <Link to={"/view_event/"+event.id} class="btn btn-primary">Voir les details,</Link>
                    </div>
                  </div>
                )
            })}

        </div>
        </>
    )
}

export default Events;
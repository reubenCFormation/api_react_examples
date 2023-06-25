import react,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import Header from "./Header";

const ViewMember=()=>{
    const params=useParams();
    // ici avec useParams, j'ai un objet qui stockera l'id qui a etait passé lors que j'ai declenché la route. ici je vais pouvoir le recuperer
    console.log(params.memberId);
    const [user,setUser]=useState({});

    const getData=()=>{
        axios.get("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/user_catalogue/find_member.php?user_id="+params.memberId,{headers:{Authorization:"Bearer "+cookie.get("token")}}).then((response)=>{
            console.log("get response");
            console.log(response);
            setUser(response.data);

        }).catch((error)=>{
            console.log("get error");
            console.log(error);
        });
    }

    useEffect(()=>{
        getData();
    },[])

    
    return(
       <>
        <Header/>
        <h4 class="text-center"> Details du membre</h4>
        <ul class="list-group">
            <li class="list-group-item">Prenom : {user.firstname}</li>
            <li class="list-group-item"> Nom: {user.lastname}</li>
            <li class="list-group-item">email: {user.email}</li>
            <li class="list-group-item">description: {user.description}</li>
            
</ul>
       </>
    )
}

export default ViewMember;
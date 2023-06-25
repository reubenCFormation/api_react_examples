import react,{useState,useEffect} from "react";
import Header from "./Header";
import axios from "axios";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Members=()=>{
    // Ici en faisant appel a la fonction useNavigate de react-router-dom je vais pouvoir rediriger a un chemin lors que je souhaite le faire.
    const navigation=useNavigate();
    const [members,setMembers]=useState([]);

    const getData=()=>{
        // remarquer ici l'objet avec les en-tetes. je suis en train de preciser que pour acceder a nos membres je dois etre authentifié pour le faire et donc je dois avoir un token qui est valide. J'ai stocké le token dans mes cookies et je peux le reucperer en faisiant un cookie.get("token") vu que j'ai fait un import cookie from js-cookie sur la ligne 4
        axios.get("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/user_catalogue/members.php",{headers:{Authorization:"Bearer "+cookie.get("token")}}).then((response)=>{
            console.log("GET RESPONSE");
            console.log(response);
            setMembers(response.data);
        })
    }

    useEffect(()=>{
        getData();
    },[])
    
    return (<>
        <Header/>
         <h2> Les Membres</h2>
         {members.length>0 ? 
         <table class="table  table-bordered">
            
                <th> Prenom</th>
                <th> Nom </th>
                <th> Email</th>
                <th> Description</th>
                <th> Details</th>
                
            
            <tbody>
                {members.map((member)=>{
                 return (
                    <tr>
                        <td> {member.firstname}</td>
                        <td> {member.lastname}</td>
                        <td> {member.email}</td>
                        <td> {member.description}</td>
                        <td> <button onClick={()=>{
                            
                            // Ici je defini a quoi va correspondre :memberId. En l'occurence, ca sera l'id de notre member sur lequelle nous allons cliquer dessus. Je fais egalement appel a la fonction navigation que j'ai recuperer plus haut qui me permettra de faire une redirection
                            navigation("/see_member/"+member.id)
                        }} class="btn btn-primary"> Details</button></td>
                        {/* Ici je peux afficher la date "d'expiration" de chacun de mes membres */}
                        {/* {member.expiration_date ? <td>{member.expiration_date}</td> :<span></span> */}
                        
                    </tr>
                 )
                })}
            </tbody>
         </table>
         :<span></span>}
         </>)
}

export default Members;
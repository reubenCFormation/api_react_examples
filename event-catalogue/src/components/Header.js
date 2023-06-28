import react,{useState,useEffect} from "react";
import cookie from "js-cookie";

// est utilisé pour faire une redirection en react!
import { useNavigate } from "react-router-dom";

const Header=()=>{
    // nous devons faire appel a la fonction useNavigate pour pouvoir avoir access a une autre fonction oour pouvoir faire des redirections
    const navigate=useNavigate();
    
    return (
        <>
       
         <div class="bg-info p-3">
            <div class="d-flex justify-content-end">
            {/*  Nous ne pouvons que retourner une seul valeur en jsx, c'est pour cela que si nous n'avons pas de balise parente, nous devons englober tous nos balises dans une balise parente "vide". Comme je le fais ici avec un <> </>*/}
           
            
             {cookie.get("token")? <> 
                <div class="m-1"> <a class="btn btn-primary" href="event/create"> Creer un evenment</a></div>
                <div class="m-1"> <a class="btn btn-primary" href="/events"> Voir les evenments</a></div>
                <button onClick={()=>{
                    cookie.remove('token');
                    cookie.remove('userId');
                    navigate("/");
                }} class="m-1 btn btn-primary"> Deconnexion </button>
             </>: <>
                    <div class="m-1"> < a class="btn btn-primary" href="/signup"> Inscription </a></div>
                    <div class="m-1"> <a class="btn btn-primary" href="/login">Connection </a> </div> 
                </>  } 
                
                
            </div>
         </div>
        </>
    )
}

export default Header;

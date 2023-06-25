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
                {cookie.get("token") ? 
                
                <>
                    <div class="m-1"> <a class="btn btn-primary" href="/members/all"> Voir les membres</a> </div>
                    
                    <div onClick={()=>{
                        // lors que je clique sur le bouton pour me deconnecter, je vais vider le contenu de mes cookies et ensuire je vais rediriger a l'accuel en utilisant la fonction navigate que j'ai recupereé plus haut 
                        cookie.remove("token");
                        cookie.remove("userId");
                        console.log("GET COOKIES");
                        console.log(cookie);
                        navigate("/");
                        console.log("disconnection button clicked!")
                    }} class="m-1"> <button class="btn btn-primary" href="/#"> Deconnexion</button> </div>
                </>
                
                : 
                
                <>
                    <div class="m-1"> < a class="btn btn-primary" href="/register"> Inscription </a></div>
                    <div class="m-1"> <a class="btn btn-primary" href="/login">Connection </a> </div> 
                </> }
                
            </div>
         </div>
        </>
    )
}

export default Header;
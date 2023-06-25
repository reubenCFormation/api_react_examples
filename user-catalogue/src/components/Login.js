import react,{useState,useEffect} from "react";
import Header from "./Header";
import axios from "axios";
// js-cookie est une cookie qui va pouvoir stocker des informations persistantes dans notre navigateur. A savoir que les informations ne seront que visible pour l'utilisateur en cours et a personne d'autre. A savoir aussi que les cookies ne peux que contenir des chaines de caracteres
import cookie from "js-cookie";
import {useNavigate} from "react-router-dom";

const Login=()=>{

    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errorMsg,setErrorMsg]=useState("");
    
    const navigate=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(email && password){
            const dataToSend={email:email,password:password};
            axios.post("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/user_catalogue/login.php",dataToSend).then((response)=>{
                console.log("GET RESPONSE");
                console.log(response);
                if(response.data.user){
                    // lors que je suis authentifié, je serai renvoyer les informations de l'url a la quelle je fais appel. Cette url va me renvoyer les informations de l'utilisateur qui s'est authentifié ainsi que le token. Je vais pouvoir stocker ces informations dans mes cookies et ces informations sertont persistantes!
                    const user=response.data.user;
                    const token=response.data.token;
                    // je vais aussi conserver l'id de notre utilisateur dans les cookies car nous allons besoin d'acceder a ces informations plus tard!
                    cookie.set("userId",user.id);
                    cookie.set("token",token);
                    // apres je vais rediriger vers la route /members/all
                    navigate("/members/all");
                }

                else{
                    setErrorMsg("invalid credentials!");
                }
            }).catch((error)=>{
                console.log("GET ERROR");
                console.log(error);
            })
        }

        else{
            setErrorMsg("Vieullez definir un email et un mot de passe!")
        }
    }
    return (
        <>
            <Header/>
            <form onSubmit={handleSubmit}>
                {errorMsg? <div class="alert alert-danger">{errorMsg}</div> :<span></span>}
            <div class="col-6 d-flex flex-column justify-content-center">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input onChange={(event)=>{
                        setEmail(event.target.value);
                    }} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input onChange={(event)=>{
                        setPassword(event.target.value);
                    }} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <br/>
             <div class="d-flex justify-content-center">
                
                <button type="submit" class="btn btn-primary col-6"> Submit</button>
             </div>
            
            </div>
             

            </form>
        </>
       
    )
}

export default Login;
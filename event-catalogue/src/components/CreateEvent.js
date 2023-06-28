import react,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"
import cookie from "js-cookie";
import axios from "axios";

const CreateEvent=()=>{
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [date,setDate]=useState("");
    const [capacity,setCapacity]=useState("");
    const [errorMsg,setErrorMsg]=useState("");
    const [sucessMsg,setSuccessMsg]=useState("");

   

    const handleSubmit=(event)=>{
        event.preventDefault();

        if(title && description && category && date && capacity){
            const dataToSend={title:title,description:description,category:category,date:date,capacity:capacity,userId:cookie.get("userId")};

            axios.post("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/event_catalogue/createEvent.php",dataToSend,{headers:{Authorization:"Bearer "+cookie.get("token")}}).then((response)=>
            {
                console.log("GET RESPONSE");
                console.log(response);
                setSuccessMsg(response.data.message);
                
            }).catch((error)=>{
                console.log("get error!");
                console.log(error);
                setErrorMsg(error.message);
            })

            
        }

        else{
            setErrorMsg("Votre formulaire contient des champs vide")
        }
    }
    return (
        <>
            <Header/>
            <h4 class="text-center"> Creation d'un evenment</h4>
            {sucessMsg? <div class="text-center alert alert-success">{sucessMsg}</div> :<span></span>}
            {errorMsg? <div class="text-center alert alert-danger">{errorMsg}</div> :<span></span>}
            <form onSubmit={handleSubmit}>
                <div class="form-group col-6">
                <label for="title">Titre</label>
                <input onChange={(event)=>{
                    setTitle(event.target.value);
                }} type="text" class="form-control"/>
                </div>

                <div class="form-group col-6">
                 <label for="description">Description</label>
                 <textarea onChange={(event)=>{
                    setDescription(event.target.value);
                 }} class="form-control" rows="10" cols="10" />
                </div>

                <div class="form-group col-6">
                 <label for="description">Capacité</label>
                 <input onChange={(event)=>{
                    setCapacity(event.target.value);
                 }} type="number" class="form-control"/>
                </div>


                <br/>
                <div class="form-group col-6">
                <select onChange={(event)=>{
                    setCategory(event.target.value);
                }} class="form-select" aria-label="Default select example">
                    <option selected>Choisissez votre categorie</option>
                    <option value="sports">Sports</option>
                    <option value="loisirs">Loisirs</option>
                    <option value="lecture">Lecture</option>
                    <option value="commerce">Commerce</option>
                    <option value="tennis">Tennis</option>
                    <option value="divertissements">Divertissements</option>
                </select>
                </div>

                <br/>

                <div class="form-group col-6">
                    <label for="date"> Date de l'evenment</label>
                    <input onChange={(event)=>{
                        setDate(event.target.value);
                    }} type="date" class="form-control"/>
                </div>
                <br/>
               
                <div class="col-4">
                <button type="submit" class="btn btn-primary col-6">Valider</button>
                </div>
                
            </form>
            
        </>
       
    )
}

export default CreateEvent;
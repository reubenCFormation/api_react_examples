import react,{useState,useEffect} from "react";
import Header from "./Header";
import axios from "axios";

const Signup=()=>{
    const [firstname,setFirstName]=useState("");
    const [lastname,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [description,setDescription]=useState("");
    const [password,setPassword]=useState("");
    const [errorMsg,setErrorMsg]=useState("");
    const [sucessMsg,setSucessMsg]=useState("");

    const clearFormValues=()=>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setDescription("");
    }

    const handleSubmit=(event)=>{
        event.preventDefault();

        if(firstname && lastname && email && description && password ){
            const dataToSend={firstname:firstname,lastname:lastname,email:email,password:password,description:description};
            
            axios.post("http://localhost:8080/introPHP/cours-php-dynamique/serie3/api/event_catalogue/signup.php",dataToSend).then((response)=>{
                console.log("get response");
                console.log(response);
                if(response.data.message=="user inserted"){
                    setSucessMsg("Vous etes maintenant membre!");
                    clearFormValues();
                }

                else{
                    setErrorMsg(response.data.message);
                }
                
                
            }).catch((error)=>{
                console.log("get error");
                console.log(error)
            })
        }

        else{
            setErrorMsg("Viullez remplir tous les champs du formulaire!")
        }
    }
    return(
        <>
            <Header/>
            <h4> Inscription</h4>
            <form onSubmit={handleSubmit}>
                {errorMsg? <div class="alert alert-danger">{errorMsg}</div> :<span></span>}
                {sucessMsg? <div class="alert alert-success">{sucessMsg}</div> :<span></span>}
            <div class="col-6 d-flex flex-column justify-content-center">
            <div class="form-group">
                    <label for="exampleInputEmail1">Prenom</label>
                    <input onChange={(event)=>{
                        setFirstName(event.target.value);
                    }} type="text" class="form-control" value={firstname}/>
    
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Nom</label>
                    <input onChange={(event)=>{
                        setLastName(event.target.value);
                    }} type="text" class="form-control" value={lastname} />
    
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input onChange={(event)=>{
                        setEmail(event.target.value);
                    }} type="email" class="form-control" value={email}  />
    
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input onChange={(event)=>{
                        setPassword(event.target.value);
                    }} type="password" class="form-control" value={password} />
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <textarea onChange={(event)=>{
                        setDescription(event.target.value);
                    }} class="form-control" cols="20" rows="10" value={description}></textarea>
                </div>
            
                {/*<div class="form-group">
                    <label for="exampleInputPassword1"> Expiration Date</label>
                    <input onChange={(event)=>{
                       setDate(event.target.value);
                    }} type="date" class="form-control"/>
                </div> */}
                <br/>
             <div class="d-flex justify-content-center">
                
                <button type="submit" class="btn btn-primary col-6"> Submit</button>
             </div>
            
            </div>
             

            </form>

        </>
        
    )
}

export default Signup;

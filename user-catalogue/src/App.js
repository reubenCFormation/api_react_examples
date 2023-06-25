import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Members from "./components/Members";
import Register from "./components/Register";
import ViewMember from "./components/ViewMember";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="container">
    <Router>
    <Routes>
       <Route path="/" element={<Header/>}/>
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
       <Route path="/members/all" element={<Members/>}/>
       {/* Remarquer le /:memberId. C'est une facon de dire a react que la route prendra un parametre dynamique que nous allons y faire appel */}
       <Route path="/see_member/:memberId" element={<ViewMember/>}/>
    </Routes>
 </Router>
    </div>
   
  );
}

export default App;

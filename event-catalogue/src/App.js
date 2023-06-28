import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Events from "./components/Events";
import Event from "./components/Event";
import CreateEvent from "./components/CreateEvent";
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
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/events" element={<Events/>}/>
              <Route path="/view_event/:eventId" element={<Event/>}/>
              <Route path="/event/create" element={<CreateEvent/>}/>
          </Routes>
      </Router>

    </div>
  
   
    
    
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/noteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

import Addnote from "./Components/Addnote";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />      
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route exact path="/About" element={<About />}></Route>
              <Route exact path="/Login" element={<Login/>}></Route>
              <Route exact path="/Signup" element={<Signup />}></Route>

              <Route exact path="/Addnote" element={<Addnote/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

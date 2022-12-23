import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './components/Home'
import Error from './components/Error'
import Register from "./components/Register";
import axios from "axios";
import Login from "./components/Login";
import Raise from "./components/Raise";
import About from "./components/About";

axios.defaults.withCredentials = true;
function App() {       
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/raise" element={<Raise />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="*" element={<Error />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

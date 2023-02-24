import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AddBooks from "./containers/AddBooks";
import SearchBooks from "./containers/SearchBooks";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <NavBar/>
         <Routes>
            <Route path="/" element = {<AddBooks/>}/>
            <Route path="/search" element = {<SearchBooks/>}/>

          </Routes>  
        <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;

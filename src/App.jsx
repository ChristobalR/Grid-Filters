import React from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



import Navbar from './components/navbar/navbar.jsx';
import Main from './components/main/main.jsx';
import Home from './components/home/home.jsx';


//


function App() {
  
  
  return(
    <>
    
    <BrowserRouter>
      
        <Navbar />
        
        <Routes>
           
          <Route path="/" element={<Home/>} />
          <Route path="/category/all" element={<Main/>} />
          <Route path="/category/:categoria" element={<Main/>}/>
          
        

          
         
        </Routes>
      
    </BrowserRouter>
    </>
    
  )
  }
  
export default App
import React, { useEffect } from "react";
import Login from "./Login";
import {Route, Routes} from "react-router-dom";
// import App from "../components/App";

function Logs() {  

   return <>

   {/* <Login/> */}
   <Routes>
      <Route exact path="/" element={ <Login/> } />
      {/* <Route path="/keeper" element={<App/>} /> */}
   </Routes> 
   
   </> 
}

export default Logs; 

 
import React, { useEffect, useState } from "react";
import Login from "./Login";
import { Route, Routes, useNavigate, Navigate} from "react-router-dom";
import App from "../components/App";
import axios from "axios";


function Logs() {  

   const [user, setLoginUser] = useState(JSON.parse(localStorage.getItem("myUser")) || null);

   const navigate = useNavigate();

   // useEffect(async () =>{
   //    const googleUser = await axios.get("http://localhost:8080/auth/google");
   //    if(googleUser){
   //       localStorage.setItem("myUser", JSON.stringify(googleUser));
   //       navigate("/keeper");
   //    }
      
   // },[])



   useEffect(() => {
      const usero = JSON.parse(localStorage.getItem("myUser"));
   },[])

   function checkAccount (user){
      localStorage.setItem("myUser", JSON.stringify(user));
      setLoginUser(user);
   }


   return <>

      {/* <Login/>  */}
      <Routes>
        <Route exact path="/" element={ <Login checkAccount={checkAccount} /> } />
        <Route path="/keeper" element={user && user._id ? <App user={user} checkAccount={checkAccount} /> : <Navigate to="/" />} />
      </Routes> 
      {/* <Navigate to="/" /> */}
   
   </> 
}

export default Logs; 

 
// @/src/router.tsx
// import { GiRoyalLove } from "react-icons/gi";
import { Routes, Route, Navigate} from "react-router-dom";

// import  App  from "./App";
import  Stations  from "./pages/Stations";
import  StationInfo  from "./pages/StationInfo";
import About  from "./pages/About";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
// import { Other } from "./pages/Other";
// import { NotFound } from "./pages/NotFound";

import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
import {useState} from "react"
import { useSmartAccountContext } from "./contexts/SmartAccountContext";

const Requireauth =({child})=>{
  const { connect, address, loading: eoaWalletLoading } = useWeb3AuthContext();
  return address ? child : <Navigate to ="/"/> 

}

export const Router = () => {

 
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/home" element={<Requireauth><Dashboard/></Requireauth>} />
      <Route path="/stations" element={<Stations/>} />
      <Route path = "/stations/:id" element = {<StationInfo/>} />
      <Route path="/about" element={<About />} />



      {/* <Route path="/other" element={<Other />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default Router;
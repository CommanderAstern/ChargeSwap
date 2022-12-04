// @/src/router.tsx
// import { GiRoyalLove } from "react-icons/gi";
import { Routes, Route, Navigate} from "react-router-dom";

// import  App  from "./App";
import  Stations  from "./pages/Stations";
import  StationInfo  from "./pages/StationInfo";
import About  from "./pages/About";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
// import { Other } from "./pages/Other";
// import { NotFound } from "./pages/NotFound";

import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
import {useState} from "react"
import { useSmartAccountContext } from "./contexts/SmartAccountContext";

import { useAuth } from "./Auth";

 const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export const Router = () => {

 
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/home" element={<Dashboard/>} />
      <Route path="/stations" element={<Stations/>} />
      <Route path = "/stations/:id" element = {<StationInfo/>} />
      <Route path="/about" element={<About />} />
      <Route path="/payment" element={<Payment />} />
      {/* <Route path="/other" element={<Other />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default Router;
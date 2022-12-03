// @/src/router.tsx
// import { GiRoyalLove } from "react-icons/gi";
import { Routes, Route, Navigate } from "react-router-dom";

import  App  from "./pages/App";
import  Stations  from "./pages/Stations";
import  StationInfo  from "./pages/StationInfo";
import About  from "./pages/About";
import Landing from "./pages/Landing";
// import { Other } from "./pages/Other";
// import { NotFound } from "./pages/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/stations" element={<Stations />} />
      <Route path = "/stations/:id" element = {<StationInfo />} />
      <Route path="/about" element={<About />} />


      {/* <Route path="/other" element={<Other />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default Router;
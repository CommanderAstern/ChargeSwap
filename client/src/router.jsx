// @/src/router.tsx
import { GiRoyalLove } from "react-icons/gi";
import { Routes, Route } from "react-router-dom";

import  App  from "./pages/App";
import  Stations  from "./pages/Stations";
import  StationInfo  from "./pages/StationInfo";
// import { Other } from "./pages/Other";
// import { NotFound } from "./pages/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/home" element={<App />} />
      <Route path="/stations" element={<Stations />} />
      <Route path = "/stations/:id" element = {<StationInfo />} />


      {/* <Route path="/other" element={<Other />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default Router;
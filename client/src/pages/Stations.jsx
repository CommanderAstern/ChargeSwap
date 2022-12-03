import React, { useEffect, useState } from "react";
import styles from "../style";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import {
  SearchStations,
} from "../components";
import { useNavigate } from "react-router-dom";

export const Stations = () => {
  const { connect,disconnect,address, loading: eoaWalletLoading } = useWeb3AuthContext();
  const navigate = useNavigate();


  // useEffect (() => {
  //   if(!address && !eoaWalletLoading){
  //     navigate("/");
  //   }

  // })

  return (
    <div>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */}

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <SearchStations />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Stations;

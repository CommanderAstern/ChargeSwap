import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../style";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  PaymentConfirmed
} from "../components";

export const Payment = () => {
  
//   const { connect,disconnect,address, loading: eoaWalletLoading } = useWeb3AuthContext();
//   const navigate = useNavigate();

//     useEffect (() => {
//     if(!address && !eoaWalletLoading){
//       navigate("/");
//     }

//   })
    //query parametes

  return (
    <div>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */}

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <PaymentConfirmed/>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Payment;

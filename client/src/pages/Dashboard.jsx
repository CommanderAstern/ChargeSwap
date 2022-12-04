import React, {useEffect, useState} from "react";
import styles from "../style";
import { useNavigate } from "react-router-dom";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";

import {
 
  DashboardInfo,
} from "../components";

export const Dashboard = () => {
  const { connect,disconnect,address, loading: eoaWalletLoading } = useWeb3AuthContext();
  const [add, setAdd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!address) navigate("/");
    else setAdd(address);
    
  }, [address]);
  return (
    <div className="mb-[20rem]">
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */}

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <DashboardInfo />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;

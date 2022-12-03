import React from "react";
import styles from "../style";

import {
 
  DashboardInfo,
} from "../components";

export const Dashboard = () => {
  return (
    <div>
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

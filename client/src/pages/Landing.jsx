import React, { useState } from "react";
import styles from "../style";

import {
  LandingPage,
  Dashboard,
} from "../components";

export const Landing = () => {
  return (
    <div>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */}

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <LandingPage />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;

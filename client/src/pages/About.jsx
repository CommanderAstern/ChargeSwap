import React, { useState } from "react";
import styles from "../style";

// import {
//   Navbar,
//   Footer,
//   Station,
//   SearchStations,
//   DashboardInfo
// } from "../components";

export const About = () => {
  return (
    <div>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */}

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          {/* <DashboardInfo /> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default About;

import React, { useState } from "react";
import styles from "../style";

import {
  SearchStations,
} from "../components";

export const Stations = () => {
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

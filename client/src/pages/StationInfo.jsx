import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../style";

import {
  Navbar,
  Footer,
  Station,
  SearchStations,
  Dashboard,
} from "../components";

export const Stations = () => {
    //query parametes
    const { id } = useParams();

  return (
    <div>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */}

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <Station id ={id}/>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Stations;

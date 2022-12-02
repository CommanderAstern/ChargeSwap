import React, { useState } from "react";
import styles from "./style";

import {
  Navbar,
  Footer,
  Station,
  SearchStations,
  Dashboard,
} from "./components";

const App = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <SearchStations />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

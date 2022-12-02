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
    </div>
  );
};

export default App;

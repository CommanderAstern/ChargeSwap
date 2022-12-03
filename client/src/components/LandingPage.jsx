import React from "react";
import Hero from "./Hero";
import LandingPageNavbar from "./LandingPageNavbar";
import Stats from "./Stats";
import Steps from "./Steps";
import Technologies from "./Technologies";
import CTA from "./CTA";
import styles from "../style";

const LandingPage = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <LandingPageNavbar/>
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div>

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          <Stats/>
          <Steps/>
          <Technologies />
          <CTA/>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

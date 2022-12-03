import React from "react";
import styles, { layout } from "../style";
import { steps } from "../constants";
import Button from "./Button";

{
  /* <span className="text-teal-200 font-bold w-[100%] h-[100%]">
        {React.createElement(icon)}
      </span> */
}
const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px]
	${index === steps.length - 1 ? "mb-0" : "mb-6"} feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[23px] mb-1">
        {content}
      </p>
    </div>
  </div>
);

const Steps = () => {
  return (
    <section id="how-it-works" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          You do the steps, <br className="sm:block hidden" />
          we'll handle the <span className="text-gradient">power</span>.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Our system is powered by blockchain and IoT, ensuring that your data
          is secure and your transactions are fast and reliable.
        </p>
        {/* styles is a prop */}
        {/* <Button styles="mt-10" /> */}
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {steps.map((feature, index) => (
          <FeatureCard key={feature.id} index={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Steps;

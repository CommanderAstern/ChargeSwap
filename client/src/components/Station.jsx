import React from "react";
import styles from "../style";
import SearchBar from "./SearchBar";

const FeatureCard = ({
  icon,
  stationName,
  stationLocation,
  status,
  distance,
}) => (
  <div
    className={`flex flex-row p-6 rounded-[20px]
	${index === educationList.length - 1 ? "mb-0" : "mb-6"} feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="icon" className="w-[80%] h-[80%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-4">
      <h4 className="font-poppins font-semibold text-white text-[20px] leading-[30px] mb-1 text-gradient">
        {title}
      </h4>
      <p className="font-poppins font-normal text-white text-[16px] leading-[30px] mb-1 ">
        {degree}
      </p>
      <p className="font-poppins font-normal text-dimWhite text-[14px] leading-[30px] mb-1">
        {duration}
      </p>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[30px] mb-1">
        - {content1}
      </p>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[30px] mb-1">
        - {content2}
      </p>
    </div>
  </div>
);

const Station = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default Station;

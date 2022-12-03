import React from "react";
import { IoNavigateCircle } from "react-icons/io5";
import { BsDot} from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";



const StatusTag = ({ status, source }) => {
  return (
    <div className="flex items-center">
      <span
        className={`${
          status == "available" ? "text-green-400" : "text-red-600"
        }`}
      >
        <BsDot />
      </span>
      <span className="font-poppins text-dimWhite md:text-xs text-[8px] leading-[30px]">
        Batteries {status}
      </span>
     { source && <span className="px-2 text-green-400">
      <FaLeaf/>
      </span>}

    </div>
  );
};

const StationCard = ({
  image,
  stationName,
  stationLocation,
  status,
  distance,
  source
}) => (
  <div className="flex justify-between mt-6 feature-card rounded-[18px] px-6 items-center py-4">
    <div className="flex justify-start">
      <img src={image} alt="station" className="rounded-md w-[60px] h-[60px]" />
      <div className="flex flex-col ml-6">
        <p className="font-bold text-white md:text-lg text-xs">
          {stationName}, {stationLocation}
        </p>
        {/* <p className="font-semibold text-white text-base">{stationLocation}</p> */}
        <StatusTag status={status} source = {source} />
      </div>
    </div>

    <div className="flex justify-center items-center">
      <IoNavigateCircle size="1rem" className="text-dimWhite mr-2" />
      <p className="font-semibold text-white md:text-base text-[8px]">{distance} km away</p> 

    </div>
  </div>
);

export default StationCard;

import React from "react";
import styles from "../style";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { BsFilter } from "react-icons/bs";
import { IoNavigateCircle } from "react-icons/io5";
import { station_1, station_2, station_3 } from "../assets";
import { BsDot } from "react-icons/bs";

// font-poppins font-semibold text-white text-[20px] leading-[30px] mb-1 text-gradient

const StatusTag = ({ status }) => {
  return (
    <div className="flex items-center">
      <span
        className={`${
          status == "available" ? "text-green-400" : "text-red-600"
        }`}
      >
        <BsDot />
      </span>
      <span className="font-poppins text-dimWhite text-xs leading-[30px] ml-1">
        Batteries {status}
      </span>
    </div>
  );
};

const StationCard = ({
  image,
  stationName,
  stationLocation,
  status,
  distance,
}) => (
  <div className="flex justify-between mt-6 feature-card rounded-[18px] px-6 items-center py-4">
    <div className="flex justify-start">
      <img src={image} alt="station" className="rounded-md w-[60px] h-[60px]" />
      <div className="flex flex-col ml-6">
        <p className="font-bold text-white text-lg">{stationName}, {stationLocation}</p>
        {/* <p className="font-semibold text-white text-base">{stationLocation}</p> */}
        <StatusTag status={status} />
      </div>
    </div>

    <div className="flex justify-center items-center">
      <IoNavigateCircle className="text-dimWhite mr-2" />
      <p className="font-semibold text-white text-base">{distance} km away</p>
    </div>
  </div>
);

const SearchStations = () => {
  return (
    <div>
      <div className={`${styles.flexCenter} ${styles.paddingX} flex-col`}>
        <SearchBar />
      </div>
      <div>
        <div className="flex justify-evenly items-center mt-8">
          <p className="text-dimWhite">Searching nearest swapping stations</p>
          <Button text="Filter" icon={BsFilter} styles="ml-4 "></Button>
        </div>
      </div>

      <div className="flex flex-col md:mx-[8rem] mx-6">
        <StationCard
          image={station_1}
          stationName="Station #127A"
          stationLocation="Whitefield, Bengaluru"
          status="available"
          distance="1.1"
        />
        <StationCard
          image={station_2}
          stationName="Station #123B"
          stationLocation="Whitefield, Bengaluru"
          status="not available"
          distance="1.1"
        />
        <StationCard
          image={station_3}
          stationName="Station #126C"
          stationLocation="Whitefield, Bengaluru"
          status="available"
          distance="1.1"
        />
      </div>
    </div>
  );
};

export default SearchStations;

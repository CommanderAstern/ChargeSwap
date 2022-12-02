import React from "react";
import styles from "../style";
import SearchBar from "./SearchBar";
import Button from "./Button";
import StationCard from "./StationCard";
import { BsFilter } from "react-icons/bs";

import { station_1, station_2, station_3 } from "../assets";


// font-poppins font-semibold text-white text-[20px] leading-[30px] mb-1 text-gradient

const SearchStations = () => {
  return (
    <div>
      <div className={`${styles.flexCenter} ${styles.paddingX} flex-col`}>
        <SearchBar />
      </div>
      <div>
        <div className="flex justify-evenly items-center mt-8">
          <p className="text-dimWhite">Searching nearest swapping stations...</p>
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

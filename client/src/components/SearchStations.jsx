import React from "react";
import styles from "../style";
import SearchBar from "./SearchBar";
import Button from "./Button";
import StationCard from "./StationCard";
import { BsFilter } from "react-icons/bs";
import { useState, useEffect } from "react";
import { station_1, station_2, station_3 } from "../assets";
import ReactSearchBox from "react-search-box";

// font-poppins font-semibold text-white text-[20px] leading-[30px] mb-1 text-gradient
const SearchStations = () => {
  const [data , setData] = useState([
    {
      key: 0,
      value: "Kormangla Station",
      name: "KS",
      location : "Kormangla, Bangalore",
      status: "available",
      distance: "1.1",
      source : "Renewable"
    },
    {
      key: 1,
      value: "Hebbal",
      name: "HS",
      location : "Hebbal, Bangalore",
      status: "not available",
      distance: "6.6",
      source : "Renewable"
    },
    {
      key: 2,
      value: "Indiranagar",
      name: "IS",
      location : "Indiranagar, Bangalore",
      status: "available",
      distance: "1.1",
      source : "Renewable"
    },
    {
      key: 3,
      value: "Tumkur Road",
      name: "TS",
      location : "Tumkur, Bangalore",
      status: "available",
      distance: "5.1",
      // source : "Renewable"

    },
    {
      key: 4,
      value: "Whitefield",
      name: "WS",
      location : "Whitefield, Bangalore",
      status: "available",
      distance: "2",
      // source : "Renewable"

    }
  ]);
  const [selected, setSelected] = useState();

  // setData(fakedata);


  const [loading , setLoading] = useState(false);

  async function getStations(){
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/stations');
    const data = await response.json();
    setData(data);
    setLoading(false);
  }


  return (
     <div>
      <div className={`${styles.flexCenter} ${styles.paddingX} flex-col`}>

      <ReactSearchBox className="bg-gray-500" styles={{backgroundColor: "black !important"}}
      placeholder="Search for a station"
      data = {data}
      onSelect = {record => setSelected(record.item)}
      onFocus = {() => {
        console.log("This function is called when is focussed");
      }}
      onChange = {record => console.log(record)}
      autofocus = {true}
      inputBackgroundColor="black"
      inputFontColor="white"
      dropdownBackgroundColor="black"
      // dropdownHoverColor="black"
      />
      </div>
      {/* <div>
        <div className="flex justify-evenly items-center mt-8">
          <p className="text-dimWhite">Searching nearest swapping stations...</p>
          <Button text="Filter" icon={BsFilter} styles="ml-4 "></Button>
        </div>
      </div> */}

      <div className="flex flex-col md:mx-[8rem] mx-6">
      {!selected && data.map((station) => (
        <StationCard
          image={station_1}
          stationName={station.name}
          stationLocation={station.location}
          status={station.status}
          distance={station.distance}
          source = {station.source}
        />
      ))
          
        }
        {selected && (
          <StationCard
          image={station_1}
          stationName={selected.name}
          stationLocation={selected.location}
          status={selected.status}
          distance={selected.distance}
          source = {selected.source}

        />
        )
        }


        {/* <StationCard
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
        /> */}
      </div>
    </div>
    );
};

export default SearchStations;

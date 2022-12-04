import React, { useEffect } from "react";
import { profile, graph } from "../assets";
import { BsFillLightningChargeFill, BsRecycle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { TbScooterElectric } from "react-icons/tb";
import PastTransactionCard from "./PastTransactionCard";

const UserProfile = ({ profile, name }) => {
  return (
    <div className="feature-card p-[5rem] rounded-lg flex flex-col items-center justify-around mr-8 border">
      <img
        src={profile}
        alt="Profile"
        className="w-[40px] h-[40px] mt-2 mr-2 rounded-full hidden md:block"
      />
      <p className="text-white mt-4 text-md font-poppins">
        Hi, <span className="text-gradient">{name}</span>
      </p>
    </div>
  );
};

const StatTile = ({ heading, icon, body }) => {
  return (
    <div className="flex flex-col feature-card rounded-lg border">
      <p className="text-dimWhite text-lg mb-4 font-poppins mx-auto mt-2">
        {heading}
      </p>
      <div className="flex justify-center items-center p-4">
        <span className="text-white mr-2">{React.createElement(icon)}</span>
        <p className="text-gradient text-xl font-poppins">{body}</p>
      </div>
    </div>
  );
};

const Graph = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "No of times battery swapped",
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [0, 1, 5, 10, 2, 20],
      },
    ],
  };

  const configLineChart = {
    type: "line",
    data,
    options: {},
  };

  // var chartLine = new Chart(
  //   document.getElementById("chartLine"),
  //   configLineChart
  // );

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
    <div class="shadow-lg rounded-lg overflow-hidden flex  flex-col  my-8 mx-auto w-[70%]">
      <h2 className="my-2 mt-2 text-gradient text-3xl font-poppins">Battery Swap Stats</h2>
      <img src={graph} alt="graph" />
    </div>
    </div>
  );
};

const DashboardInfo = () => {
  return (
    <div className="flex flex-col">
      {/* First section */}
      <div className="flex justify-center items-center mt-4">
        <UserProfile profile={profile} name="Jane" />
        <div className="ml-8 grid gap-4 grid-cols-2 grid-rows-2">
          <StatTile
            heading="Energy"
            icon={BsFillLightningChargeFill}
            body="18 kWh"
          />
          <StatTile heading="Swaps" icon={BsRecycle} body="10" />
          <StatTile heading="ETH Spent" icon={SiEthereum} body="0.001" />
          <StatTile heading="Distance" icon={TbScooterElectric} body="53 km" />
        </div>
      </div>

      {/* Second Section */}
      <Graph />

      {/* Third section */}
      <div className="flex flex-col md:mx-[12rem] mx-6">
        <h2 className="mt-2 text-gradient text-3xl font-poppins">
          Swap History
        </h2>
        <PastTransactionCard
          stationName="Station #127"
          stationLocation="Whitefiled, Bengaluru"
          timestamp="29th December at 10:12 AM"
          batteries="2"
          eth="0.00023"
          power="2kWh"
        />
        <PastTransactionCard
          stationName="Station #27"
          stationLocation="Varthur, Bengaluru"
          timestamp="29th November at 10:12 AM"
          batteries="2"
          eth="0.02"
          power="5kWh"
        />
        <PastTransactionCard
          stationName="Station #56"
          stationLocation="Indiranagar, Bengaluru"
          timestamp="27th October at 07:00 PM"
          batteries="2"
          eth="0.00001"
          power="1kWh"
        />
        <PastTransactionCard
          stationName="Station #101"
          stationLocation="Kormangala, Bengaluru"
          timestamp="26th October at 10:12 AM"
          batteries="2"
          eth="0.01"
          power="10kWh"
        />
      </div>
    </div>
  );
};

export default DashboardInfo;

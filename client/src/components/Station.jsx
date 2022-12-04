import React from "react";
import styles from "../style";
import SearchBar from "./SearchBar";
import StationCard from "./StationCard";
import Button from "./Button";
import { station_1, station_2, station_3 } from "../assets";
import { GiBattery75 } from "react-icons/gi";
import { SiEthereum } from "react-icons/si";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";
import SocialLogin from "@biconomy/web3-auth";
import {useNavigate} from "react-router-dom";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { useSmartAccountContext } from "../contexts/SmartAccountContext";
import batterySwap from "../config";
import batterySwapABI from '../artifacts/contracts/BatterySwap.sol/BatterySwap.json';



const TransactionItem = ({ percentage, index, price }) => {

  const transact = async () => {
    return null;

  }

  return (
    <div className="flex justify-between">
      <div className="w-40 md:w-48">
        <div className="shadow w-1/2 rounded border-2 border-gray-400 flex my-1 relative">
          <div className="border-r-8 h-6 rounded-r absolute flex border-gray-400 ml-20 md:ml-24 mt-2 z-10"></div>
          <div
            className="cursor-default bg-green-400 text-xs font-bold leading-none flex items-center justify-center m-1 py-4 text-center text-white"
            style={{
              width: `${percentage}%`,
            }}
          >
            <div className="absolute left-0 mx-8 text-gray-700">
              {percentage}%
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-2">
        <p className="text-dimWhite font-semibold font-poppins text-xs md:text-sm">
          Battery #{index}
        </p>
        <p className="text-white font-semibold font-poppins text-sm md:text-base">
          {price} ETH
        </p>
      </div>
    </div>
  );
};

const TransactionSummary = () => {
  const navigate = useNavigate();
  const { web3Provider } = useWeb3AuthContext();
  const { state: walletState, wallet } = useSmartAccountContext();
  async function getTokenBalances() {
    const signer = web3Provider.getSigner();
    const batterySwapContract = new ethers.Contract(batterySwap, batterySwapABI.abi, signer);
    

    const ethPerChargeVal = await batterySwapContract.ethPerCharge();
    const ethPerCharge = ethPerChargeVal.toString();
    // create sample transactoin

    let totalPrice = await batterySwapContract.totalCostForUser(wallet.owner);
    totalPrice = totalPrice.toString();

    // console.log("totalPrice", totalPrice);
    let transaction = await batterySwapContract.swapAllBatteries(1, {
      value: totalPrice,
      gasLimit: 10000000,
    });
    await transaction.wait().then(
      navigate("/Payment")
    );
    
    


    // console.log(transaction);
}

const transact = async ()=>{
  // console.log(batterySwapABI)
  getTokenBalances();
}
  return (
    <div className="flex flex-col mt-8 px-8 py-8 feature-card rounded-lg md:mx-52">
      <h2 className="text-gradient font-poppins font-bold text-xl mb-4">
        Summary
      </h2>
      <TransactionItem percentage="92" index="1" price="0.00001" />
      <TransactionItem percentage="92" index="2" price="0.00001" />
      <hr className="my-2 bg-gray-800"/>
      <div className="flex justify-end">
        <span className="text-teal-200 font-semibold font-poppins">Total: 0.00002 ETH</span>
      </div>
      <button text="Pay Now" onClick = {transact}  on={SiEthereum} styles="mt-4">Pay Now</button>
    </div>
  );
};

const InfoCard = ({ title, value, icon }) => {
  return (
    <div className="feature-card flex rounded-lg rounded-[18px] px-6 items-center py-4 mt-6">
      <span className="text-[30px] text-teal-200 mr-4">
        {React.createElement(icon)}
      </span>
      {/* <FcChargeBattery size="3rem"/> */}
      <div className="flex flex-col">
        <p className="text-dimWhite font-semibold font-poppins text-base">
          {title}
        </p>
        <p className="text-white font-bold font-poppins text-xl">{value}</p>
      </div>
    </div>
  );
};

const Station = ({id}) => {
  console.log(id);
  return (
    <div>
      {/* <div className={`${styles.flexCenter} ${styles.paddingX} flex-col`}>
        <SearchBar />
      </div> */}
      <div className="flex flex-col p-4 mt-4 rounded-lg md:mx-[8rem] transition-colors duration-300 transform border hover:border-transparent dark:border-gray-700 dark:hover:border-transparent">
        <StationCard
          image={station_1}
          stationName="Station #127A"
          stationLocation="Whitefield, Bengaluru"
          status="available"
          distance="1.1"
        />
        <div className="flex flex-col md:flex-row mx-8 items-center justify-center">
          <img
            src={station_1}
            alt="station-image"
            className="mt-2 w-[400px] h-[200px] mt-8 rounded-lg"
          />
          <div className="flex flex-col md:ml-[8rem] mt-4">
            <InfoCard
              title="Batteries Available"
              value="22"
              icon={GiBattery75}
            />
            <InfoCard
              title="Price Per %"
              value="0.00001 ETH"
              icon={SiEthereum}
            />
          </div>
        </div>
        <div className="md:justify-center md:items-center">
          <TransactionSummary />
        </div>
      </div>
    </div>
  );
};

export default Station;

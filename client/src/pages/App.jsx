import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import styles from "../style";

import {
  Navbar,
  Footer,
  Station,
  SearchStations,
  Dashboard,
} from "../components";
import Button from "../components/Button";

export const App = () => {
  const [balance, setBalance] = useState(0);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [chainID, setChainID] = useState(null);
  const [chainName, setChainName] = useState(null);

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) {
      return;
    }
    if (!window.ethereum) {
      return;
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainID(result.chainID)
      setChainName(result.name)
    })
  }, [currentAccount]);

  const onClickConnect = () => {
    if (!window.ethereum) {
      console.log("Please install MetaMask to continue !!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.send("eth_requestAccounts", [])
    .then((accounts) => {
      if(accounts.length > 0) {
        setCurrentAccount(accounts[0])
        console.log(currentAccount, balance)
      }
    })
    .catch((err) => console.log(err))
  }

  const onClickDisconnect = () => {
    setBalance(null)
    setCurrentAccount(null)
    console.log(currentAccount)
  }

  return (
    <div>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div> */}

      <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
        <div className={`${styles.boxWidth}`}>
          {
            !currentAccount ?
            <button className="bg-primary text-white text-2xl font-bold py-2 px-4 rounded my-100" onClick={onClickConnect}> Connect </button>
            : <button className="bg-primary text-white text-2xl font-bold py-2 px-4 rounded my-100" onClick={onClickDisconnect}> Disconnect </button>
          }
        </div>
      </div>
  
    </div>
  );
};

export default App;

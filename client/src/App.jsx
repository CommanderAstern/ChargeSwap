import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account"

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
  const [smartAccount, setSmartAccount] = useState(null)
  
  const { provider, address } = useWeb3AuthContext();
  const walletProvider = new ethers.providers.Web3Provider(provider);

  let options = {
    activeNetworkId: ChainId.POLYGON_MUMBAI,
    supportedNetworksIds: [ ChainId.GOERLI, ChainId.POLYGON_MAINNET, ChainId.POLYGON_MUMBAI]
  }

  async function lorem() {
    let temp = new SmartAccount(walletProvider, options);
    temp = await smartAccount.init();
    setSmartAccount(temp);
  }

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) {
      return;
    }
    if (!window.ethereum) {
      return;
    }
    lorem()
    
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
    <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className="h-full">
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    </div>
    <Footer />
  </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import {Navbar, Footer, Spinner, LandingPageNavbar} from "./components";
import { useSmartAccountContext } from "./contexts/SmartAccountContext";
import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
import Button from "./components/Button";
import {BrowserRouter} from 'react-router-dom';
import Router from './router';
import styles from './style';
import batterySwap from './config'
import { EmbedSDK } from "@pushprotocol/uiembed";
// import {useAuth} from './Auth'
const App  = () => {
  // const {user} = useAuth();
  // const classes = useStyles();
  const { connect,disconnect,address, loading: eoaWalletLoading } = useWeb3AuthContext();
  const { loading, state: walletState, wallet } = useSmartAccountContext();
  const [add, setAdd] = useState(null);
  const [account, setAccount] = useState(null);


  useEffect(() => {
    if(address) setAdd(address);
    if(wallet) setAccount(wallet.owner);
  }, [address, wallet]);

  useEffect(() => {
    if (account) { // 'your connected wallet address'
      EmbedSDK.init({
        headerText: 'Hello DeFi', // optional
        targetID: 'sdk-trigger-id', // mandatory
        appName: 'consumerApp', // mandatory
        user: account, // mandatory
        chainId: 80001, // mandatory
        viewOptions: {
            type: 'sidebar', // optional [default: 'sidebar', 'modal']
            showUnreadIndicator: true, // optional
            unreadIndicatorColor: '#cc1919',
            unreadIndicatorPosition: 'bottom-right',
        },
        theme: 'light',
        onOpen: () => {
          console.log('-> client dApp onOpen callback');
        },
        onClose: () => {
          console.log('-> client dApp onClose callback');
        }
      });
    }

    return () => {
      EmbedSDK.cleanup();
    };
  }, []);
  
 
  console.log(loading);
  // const { loading } = useSmartAccountContext();
  // const [balance, setBalance] = useState(0);
  // const [currentAccount, setCurrentAccount] = useState(null);
  // const [chainID, setChainID] = useState(null);
  // const [chainName, setChainName] = useState(null);
  const [smartAccount, setSmartAccount] = useState(null)
  // const [provider, address, loading: eoaWalletLoading] = useWeb3AuthContext();

  

  // let options = {
  //   activeNetworkId: ChainId.POLYGON_MUMBAI,
  //   supportedNetworksIds: [ ChainId.GOERLI, ChainId.POLYGON_MAINNET, ChainId.POLYGON_MUMBAI]
  // }

  // const walletProvider = new ethers.providers.Web3Provider(connect);

  // async function lorem() {
  //   let temp = new SmartAccount(walletProvider, options);
  //   temp = await smartAccount.init();
  //   setSmartAccount(temp);
  // }

  // useEffect(() => {
  //   if(!currentAccount || !ethers.utils.isAddress(currentAccount)) {
  //     return;
  //   }
  //   if (!window.ethereum) {
  //     return;
  //   }
  //   lorem()
    
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   provider.getBalance(currentAccount).then((result)=>{
  //     setBalance(ethers.utils.formatEther(result))
  //   })

  //   provider.getNetwork().then((result)=>{
  //     setChainID(result.chainID)
  //     setChainName(result.name)
  //   })
  // }, [currentAccount]);

  // const onClickConnect = () => {
  //   if (!window.ethereum) {
  //     console.log("Please install MetaMask to continue !!");
  //     return;
  //   }

  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   provider.send("eth_requestAccounts", [])
  //   .then((accounts) => {
  //     if(accounts.length > 0) {
  //       setCurrentAccount(accounts[0])
  //       console.log(currentAccount, balance)
  //     }
  //   })
  //   .catch((err) => console.log(err))
  // }

  // const onClickDisconnect = () => {
  //   setBalance(null)
  //   setCurrentAccount(null)
  //   console.log(currentAccount)
  // }

  // if (!address) {
  //   return (
  //     <div
  //       className={classes.bgCover}
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         paddingTop: "30vh",
  //       }}
  //     >
  //       <h1 className={classes.title}>Biconomy SDK Demo</h1>
  //       <Button
  //         title="Get Started"
  //         onClickFunc={connect}
  //         isLoading={eoaWalletLoading}
  //         style={{
  //           fontSize: 20,
  //           padding: "30px 20px",
  //           border: 0,
  //           background:
  //             "linear-gradient(90deg, #0063FF -2.21%, #9100FF 89.35%)",
  //         }}
  //       />
  //       <ToastContainer />
  //     </div>
  //   );
  // }

  // return (
  //   <div className={classes.bgCover}>
  //     <Navbar />
  //     {loading ? (
  //       <div className={classes.container}>
  //         <img src="/logo.svg" className={classes.animateBlink} alt="" />
  //       </div>
  //     ) : (
  //       <TabsBody />
  //     )}
  //     <ToastContainer />
  //   </div>
  // );
 
  return (
  
     <div className="bg-primary w-full overflow-hidden">
    {add && <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar/>
       <div className="flex flex-column"> <Button
          title="Logout"
          onClickFunc={disconnect}
          isLoading={eoaWalletLoading}
          style={{
            fontSize: 20,
            padding: "30px 20px",
            border: 0,
            background:
              "linear-gradient(90deg, #0063FF -2.21%, #9100FF 89.35%)",
          }}
        />
       <span className="px-2 text-white my-auto"> {address}</span>
       <button className="text-black px-2 bg-green-400 rounded" id="sdk-trigger-id">Push Notifs</button> 
       </div>

      </div>
    </div>}
    {!add && <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <LandingPageNavbar  />
        {/* <Button
          title="Get Started"
          onClickFunc={connect}
          isLoading={eoaWalletLoading}
          style={{
            fontSize: 20,
            padding: "30px 20px",
            border: 0,
            background:
              "linear-gradient(90deg, #0063FF -2.21%, #9100FF 89.35%)",
          }}
          
        /> */}
  
      </div>
    </div>}
           

        
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

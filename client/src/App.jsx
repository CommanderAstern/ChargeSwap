import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import {Navbar, Footer} from "./components";
import { useSmartAccountContext } from "./contexts/SmartAccountContext";
import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
import Button from "./components/Button";
import {BrowserRouter} from 'react-router-dom';
import Router from './router';
import styles from './style';

const App  = () => {
  // const classes = useStyles();
  const { connect, address, loading: eoaWalletLoading } = useWeb3AuthContext();
  const { loading } = useSmartAccountContext();

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

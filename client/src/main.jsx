import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Router from "./router";
import styles from "./style";
import { Navbar, Footer } from "./components";
import { Web3AuthProvider } from "./contexts/SocialLoginContext";
import { SmartAccountProvider } from "./contexts/SmartAccountContext";

const element = document.getElementById("root");
const root = createRoot(element);

const Index = () => {
  return (
    <Web3AuthProvider>
      {/* <Web3Provider> */}
      <SmartAccountProvider>
        <App />
      </SmartAccountProvider>
      {/* </Web3Provider> */}
    </Web3AuthProvider>
  );
};

root.render(<Index />);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <div className="bg-primary w-full overflow-hidden">
//       <div className={`${styles.paddingX} ${styles.flexCenter}`}>
//         <div className={`${styles.boxWidth}`}>
//           <Navbar />
//         </div>
//       </div>
//       <div className="h-full">
//       <BrowserRouter>
//         <Router />
//       </BrowserRouter>
//       </div>
//       <Footer />
//     </div>
//   </React.StrictMode>
);

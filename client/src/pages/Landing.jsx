import React, { useState, useEffect} from "react";
import styles from "../style";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { useNavigate } from "react-router-dom";

import { LandingPage } from "../components";

export const Landing = () => {
  const { connect,disconnect,address, loading: eoaWalletLoading } = useWeb3AuthContext();
  const [add, setAdd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(address) setAdd(address);
    navigate("/home");
    
  }, [address]);

  return <LandingPage />;
};

export default Landing;

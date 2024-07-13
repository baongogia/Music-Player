import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 

type HideProps = {
  children: React.ReactNode; 
};

const Hide: React.FC<HideProps> = ({ children }) => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    setShowNav(!location.pathname.startsWith("/MiniPlayer"));
  }, [location]);

  return <div>{showNav && children}</div>;
};

export default Hide;
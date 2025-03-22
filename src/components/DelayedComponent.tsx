import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

const DelayedComponent = ({ children }) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 600); // 30 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return showComponent ? children : <LoadingPage />;
};

export default DelayedComponent;

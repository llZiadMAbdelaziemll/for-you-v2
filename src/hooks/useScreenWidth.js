import { useState, useEffect } from "react";

export function useScreenWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update window width
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // Add event listener when component mounts
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return windowWidth;
}

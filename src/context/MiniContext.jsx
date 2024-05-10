import { createContext, useContext } from "react";
import { useState } from "react";

const MiniContext = createContext();

function MiniProvider({ children }) {
  const [mini, setMini] = useState(false);

  function toggleMini() {
    setMini((isMini) => !isMini);
  }

  return (
    <MiniContext.Provider value={{ mini, toggleMini }}>
      {children}
    </MiniContext.Provider>
  );
}

function useMini() {
  const context = useContext(MiniContext);
  if (context === undefined)
    throw new Error("MiniContext was used outside of MiniProvider");
  return context;
}

export { MiniProvider, useMini };

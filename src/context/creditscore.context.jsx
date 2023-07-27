import { useState, createContext } from "react";

import API_URL from "../../apiKey";

// const API_URL = "http://localhost:5005";
// const API_URL = "https://scoretwce-backend.onrender.com";

const CreditContext = createContext();

function CreditProvider(props) {
  const [creditScoreExists, setCreditScoreExists] = useState(false);

  return (
    <CreditContext.Provider
      value={{
        creditScoreExists,
        setCreditScoreExists,
      }}
    >
      {props.children}
    </CreditContext.Provider>
  );
}

export { CreditProvider, CreditContext };

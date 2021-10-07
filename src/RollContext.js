import React, { createContext, useState } from "react";

export const RollContext = createContext(null);

export const RollProvider = ({ children }) => {
  const [hitRollTotal, setRollTotal] = useState(0);
  const [hitRollText, setRollText] = useState("");

  return <RollContext.Provider>{children}</RollContext.Provider>;
};

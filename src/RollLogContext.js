import React, { createContext, useReducer, useState } from "react";

export const RollLogContext = createContext(null);

export const RollLogProvider = ({ children }) => {
  function addRoll(state, rollText) {
    return rollText + "\n" + state;
  }
  const [rollLog, logRoll] = useReducer(addRoll, "");

  // function addRoll(state, rollText) {
  //   return [rollText, ...state];
  // }
  // const [rollLog, logRoll] = useReducer(addRoll, []);
  return (
    <RollLogContext.Provider
      value={{
        rollLog,
        logRoll,
      }}
    >
      {children}
    </RollLogContext.Provider>
  );
};

import React, { createContext, useReducer } from "react";

export interface RollLogContent {
  rollLog: string;
  logRoll: (rollText: string) => void;
}

export const RollLogContext = createContext<RollLogContent>({
  rollLog: "",
  logRoll: () => {},
});

export const RollLogProvider: React.FC<{}> = ({ children }) => {
  function addRoll(state: string, rollText: string): string {
    return rollText + "\n" + state;
  }
  const [rollLog, logRoll] = useReducer(addRoll, "");

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

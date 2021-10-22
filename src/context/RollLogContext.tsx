import React, { createContext, useReducer } from "react";
import { ActionData } from "../data/ActionData";
import {
  ABILITY_ROLL_DEFAULT,
  DiceRollDetails,
  MultiRoll,
  rollAttack,
  rollDice,
  textToDice,
} from "../util/Roller";

export interface ActionDetails {
  monsterName?: string;
  actionName?: string;
  rolls: DiceRollDetails[];
}

export interface ActionResults {
  monsterName?: string;
  actionName?: string;
  rolls: MultiRoll[];
}

export interface RollLogContent {
  rollLog: ActionResults[];
  logRoll: (details: ActionDetails) => void;
}

export const RollLogContext = createContext<RollLogContent>({
  rollLog: [],
  logRoll: () => {},
});

function actionDetailsToResults(details: ActionDetails): ActionResults {
  let results = details.rolls.map((detail) => {
    return rollDice(detail);
  });
  return {
    monsterName: details.monsterName,
    actionName: details.actionName,
    rolls: results,
  };
}

export const RollLogProvider: React.FC<{}> = ({ children }) => {
  function addRoll(
    state: ActionResults[],
    details: ActionDetails
  ): ActionResults[] {
    return [actionDetailsToResults(details), ...state];
  }
  const [rollLog, logRoll] = useReducer(addRoll, []);

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

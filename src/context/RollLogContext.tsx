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
  logRoll: (details: ActionData) => void;
}

export const RollLogContext = createContext<RollLogContent>({
  rollLog: [],
  logRoll: () => {},
});

export function toDetails(data: ActionData): ActionDetails {
  let rolls: DiceRollDetails[] = [];
  rolls.push({
    ...ABILITY_ROLL_DEFAULT,
    rollTitle: "To Hit:",
    bonus: data.attack_bonus,
  });

  rolls.push({
    rollTitle: "Damage:",
    bonus: data.damage_bonus,
    toRoll: [textToDice(data.damage_dice)],
    rolls: 1,
  });

  return {
    monsterName: data.monsterName,
    actionName: data.name,
    rolls: rolls,
  };
}

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
    details: ActionData
  ): ActionResults[] {
    return [actionDetailsToResults(toDetails(details)), ...state];
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

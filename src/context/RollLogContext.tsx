import React, { createContext, useReducer } from "react";
import { ActionData } from "../data/ActionData";
import { AttackAction, rollAttack, rollDice, textToDice } from "../util/Roller";

export interface RollLogContent {
  rollLog: AttackAction[];
  logRoll: (action: ActionData) => void;
}

export const RollLogContext = createContext<RollLogContent>({
  rollLog: [],
  logRoll: () => {},
});

function actionDataToRolls(action: ActionData): AttackAction {
  let attackRoll = rollAttack(action.attack_bonus);
  let diceRoll = rollDice(
    [textToDice(action.damage_dice)],
    action.damage_bonus
  );
  return {
    monsterName: action.monsterName,
    actionName: action.name,
    attackRoll: attackRoll,
    damageRoll: diceRoll,
  };
}

export const RollLogProvider: React.FC<{}> = ({ children }) => {
  function addRoll(state: AttackAction[], action: ActionData): AttackAction[] {
    return [actionDataToRolls(action), ...state];
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

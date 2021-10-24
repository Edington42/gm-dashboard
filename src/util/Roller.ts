import { ActionData } from "../data/ActionData";

export interface Dice {
  count: number;
  sides: number;
}

export interface DiceRollDetails {
  rollTitle?: string;
  bonus: number;
  toRoll: Dice[];
  rolls: number;
}

export const ABILITY_ROLL_DEFAULT: DiceRollDetails = {
  bonus: 0,
  toRoll: [{ sides: 20, count: 1 }],
  rolls: 2,
};

export interface MultiRoll {
  bonus: number;
  rolls: DiceRoll[];
  title?: string;
}

export interface DiceRoll {
  dice: DieRoll[];
  total: number;
}

export interface DieRoll {
  roll: number;
  sides: number;
}

export interface AbilityRoll {
  initialRollTotal: number;
  advDsvRollTotal: number;
  initialRoll: DieRoll;
  advDsvRoll: DieRoll;
  bonus: number;
}

export function rollAttack(bonus: number): AbilityRoll {
  let initialRoll = rollDie(20);
  let advDsvRoll = rollDie(20);
  let initialRollTotal = initialRoll.roll + bonus;
  let advDsvRollTotal = advDsvRoll.roll + bonus;

  return {
    initialRollTotal: initialRollTotal,
    advDsvRollTotal: advDsvRollTotal,
    initialRoll: initialRoll,
    advDsvRoll: advDsvRoll,
    bonus: bonus,
  };
}

export function rollDice(details: DiceRollDetails): MultiRoll {
  let result: MultiRoll = {
    title: details.rollTitle,
    bonus: details.bonus,
    rolls: <DiceRoll[]>[],
  };
  for (let i = 0; i < details.rolls; i++) {
    let total = 0;
    let diceRolls: DieRoll[] = [];
    details.toRoll.forEach((die) => {
      for (let i = 0; i < die.count; i++) {
        let dieRoll = rollDie(die.sides);
        total += dieRoll.roll;
        diceRolls.push(dieRoll);
      }
    });
    total += details.bonus;
    result.rolls.push({ dice: diceRolls, total: total });
  }

  return result;
}

export function textToDice(text: string): Dice {
  let dieText = text.split("d");
  return { count: parseInt(dieText[0]), sides: parseInt(dieText[1]) };
}

function rollDie(sides: number): DieRoll {
  return { roll: Math.trunc(Math.random() * sides + 1), sides: sides };
}

export function rollToIconClass({ sides, roll }: DieRoll) {
  let className = "df-d";
  className += sides;
  className += "-";
  className += roll;
  return className;
}

/*Font Dice*/

const D4_1 = 97;
const D6_1 = 65;
const D8_1 = 101;
const D10_1 = 49;
const D12_1 = 109;
const D20_1 = 71;

const sidesToIndex = new Map<number, number>([
  [4, 97],
  [6, 65],
  [8, 101],
  [10, 49],
  [12, 109],
  [20, 71],
]);

const D10_10_INDEX = 48;

function rollToDieText({ sides, roll }: DieRoll) {
  if (sides === 10 && roll === 10) {
    return 0;
  }
  let code = 0;
  let index = sidesToIndex.get(sides);
  if (index) {
    code = index + roll - 1;
  }
  return String.fromCharCode(code);
}

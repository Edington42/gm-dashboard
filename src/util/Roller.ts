interface Dice {
  count: number;
  sides: number;
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

export interface DiceRoll {
  bonus: number;
  rolls: DieRoll[];
  total: number;
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

export function rollDice(dice: Dice[], bonus: number): DiceRoll {
  let total = 0;
  let rolls: DieRoll[] = [];
  console.log(dice);
  dice.forEach((die) => {
    for (let i = 0; i < die.count; i++) {
      let dieRoll = rollDie(die.sides);
      total += dieRoll.roll;
      rolls.push(dieRoll);
    }
  });
  total += bonus;

  return { bonus: bonus, rolls: rolls, total: total };
}

export function textToDice(text: string): Dice {
  let dieText = text.split("d");
  return { count: parseInt(dieText[0]), sides: parseInt(dieText[1]) };
}

function rollDie(sides: number): DieRoll {
  return { roll: Math.trunc(Math.random() * sides + 1), sides: sides };
}

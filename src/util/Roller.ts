interface Dice {
  count: number;
  sides: number;
}

export interface DieRoll {
  roll: number;
  sides: number;
}

export function rollDice(dice: Dice[], bonus: number) {
  let total = 0;
  let display = "(";
  console.log(dice);
  dice.forEach((die) => {
    for (let i = 0; i < die.count; i++) {
      let roll = rollDie(die.sides);
      total += roll;
      display += roll + "+";
    }
  });
  bonus = bonus ? bonus : 0;
  total += bonus;
  display += bonus + ")";
  display += total;

  return { total: total, display: display };
}

export function textToDice(text: string): Dice {
  let dieText = text.split("d");
  return { count: parseInt(dieText[0]), sides: parseInt(dieText[1]) };
}

export const D20 = { count: 1, sides: 20 };

function rollDie(sides: number) {
  return Math.trunc(Math.random() * sides + 1);
}

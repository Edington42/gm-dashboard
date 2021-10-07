export function rollDice(dice, bonus) {
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

export function textToDie(text) {
  let dieText = text.split("d");
  console.log(dieText);
  return { count: parseInt(dieText[0]), sides: parseInt(dieText[1]) };
}

export const D20 = { count: 1, sides: 20 };

function rollDie(sides) {
  return Math.trunc(Math.random() * sides + 1);
}

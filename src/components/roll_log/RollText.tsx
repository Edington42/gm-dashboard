import { Typography } from "@material-ui/core";
import { DieRoll } from "../../util/Roller";
import "../../dicefont/dicefont.css";

interface IProps {
  rolls: DieRoll[];
}

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

function rollToIconClass({ sides, roll }: DieRoll) {
  let className = "df-d";
  className += sides;
  className += "-";
  className += roll;
  return className;
}

export function RollText({ rolls }: IProps) {
  let rollIcons = rolls.map((roll, index) => (
    <>
      {index === 0 ? "" : "+"}
      <i key={index} className={rollToIconClass(roll) + " die-icon"} />
    </>
  ));

  let rollText = "";
  for (let i = 0; i < rolls.length; i++) {
    if (i !== 0) {
      rollText += " + ";
    }
    rollText += rollToDieText(rolls[i]);
  }

  return <>{rollIcons}</>;
}

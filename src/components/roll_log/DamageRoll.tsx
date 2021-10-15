import { DiceRoll } from "../../util/Roller";
import { Typography } from "@material-ui/core";
import { RollText } from "./RollText";

interface IProps {
  roll: DiceRoll;
}

export function DamageRollText({ roll }: IProps) {
  return (
    <Typography className="log-roll">
      Damage:
      {roll.total} (
      <RollText rolls={roll.rolls} />
      )+{roll.bonus}
    </Typography>
  );
}

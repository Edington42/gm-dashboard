import { AbilityRoll } from "../../util/Roller";
import { Typography } from "@material-ui/core";
import { RollText } from "./RollText";

interface IProps {
  roll: AbilityRoll;
}

export function AttackRollText({ roll }: IProps) {
  return (
    <Typography className="log-roll">
      To Hit:
      {roll.initialRollTotal}|{roll.advDsvRollTotal} (
      <RollText rolls={[roll.initialRoll]} />
      |
      <RollText rolls={[roll.advDsvRoll]} />
      )+{roll.bonus}
    </Typography>
  );
}

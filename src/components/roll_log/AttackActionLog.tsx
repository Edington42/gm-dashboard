import { Typography } from "@material-ui/core";
import { ResetTvRounded } from "@mui/icons-material";
import { AbilityRoll, AttackAction, DiceRoll } from "../../util/Roller";
import { AttackRollText } from "./AttackRollText";
import { DamageRollText } from "./DamageRoll";

interface IProps {
  action: AttackAction;
}

export function AttackActionLog({ action }: IProps) {
  return (
    <>
      <Typography>
        {action.monsterName}- {action.actionName}:
      </Typography>
      <AttackRollText roll={action.attackRoll} />
      <DamageRollText roll={action.damageRoll} />
    </>
  );
}

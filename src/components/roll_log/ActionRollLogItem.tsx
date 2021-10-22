import { Typography } from "@material-ui/core";
import { MultiRoll } from "../../util/Roller";
import { RollText } from "./RollText";

export function ActionRollLogItem({
  rolls,
  titled,
}: {
  rolls: MultiRoll;
  titled: boolean;
}) {
  let totals = rolls.rolls.map((roll, index) => {
    return (index != 0 ? "|" : "") + roll.total.toString();
  });

  let rollText = rolls.rolls.map((roll, index) => (
    <>
      {index != 0 ? "|" : ""}
      <RollText rolls={roll.dice} />
    </>
  ));

  return (
    <Typography className={titled ? "titled-log-roll" : "untitled-log-roll"}>
      {rolls.title && rolls.title + " "}
      {totals} ({rollText}
      )+{rolls.bonus}
    </Typography>
  );
}

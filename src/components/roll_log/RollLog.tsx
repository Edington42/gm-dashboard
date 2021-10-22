import { Paper, Typography } from "@material-ui/core";
import { useContext } from "react";
import { RollLogContext } from "../../context/RollLogContext";
import "./css/RollLog.css";
import { rollAttack, rollDice } from "../../util/Roller";
import { AttackRollText } from "./AttackRollText";
import { ActionRollLog } from "./ActionRollLog";

export function RollLog() {
  /* roll log */
  const { rollLog } = useContext(RollLogContext);

  let log = rollLog.map((logItem) => <ActionRollLog actionResults={logItem} />);

  return (
    <div className="sticky">
      <Typography variant="caption">Rolls</Typography>
      <Paper className="scroller">{log}</Paper>
    </div>
  );
}

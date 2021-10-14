import { Card, Paper, TextField, Typography } from "@material-ui/core";
import { useContext } from "react";
import { RollLogContext } from "../../context/RollLogContext";
import { RollText } from "./RollText";
import "./css/RollLog.css";

export function RollLog() {
  /* roll log */
  const { rollLog } = useContext(RollLogContext);

  return (
    <div className="sticky">
      <Typography variant="caption">Rolls</Typography>
      {/* <TextField
        label="Rolls"
        variant="outlined"
        className="scroller"
        multiline
        value={rollLog}
        inputProps={{ readOnly: true }}
        rows={6}
        rowsMax={6}
      ></TextField> */}
      <Paper className="scroller">
        <RollText rolls={[]} />
        <RollText rolls={[]} />
        <RollText rolls={[]} />
        <RollText rolls={[]} />
      </Paper>
    </div>
  );
}

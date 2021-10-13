import { TextField } from "@material-ui/core";
import { useContext } from "react";
import { RollLogContext } from "../../context/RollLogContext";

export function RollLog() {
  /* roll log */
  const { rollLog } = useContext(RollLogContext);

  return (
    <div className="sticky">
      <TextField
        label="Rolls"
        variant="outlined"
        className="scroller"
        multiline
        value={rollLog}
        inputProps={{ readOnly: true }}
        rows={6}
        rowsMax={6}
      ></TextField>
    </div>
  );
}

import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { ReactElement } from "react";
import { DieIcon } from "../../common/DieIcon";
import { rollToIconClass } from "../../util/Roller";

const BUTTON_MOD_MAX = 5;
const MOD_MAX = 30;

export function AbilityRollCard() {
  const mods: ReactElement[] = [];

  function roll() {}

  for (let i = 0; i < BUTTON_MOD_MAX + 1; i++) {
    mods.push(
      <>
        <Grid item xs={6}>
          <Button variant="contained" className="mod-button">
            +{i}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" className="mod-button">
            -{i}
          </Button>
        </Grid>
      </>
    );
  }

  const posOptions: ReactElement[] = [];
  const negOptions: ReactElement[] = [];

  for (let i = BUTTON_MOD_MAX; i < MOD_MAX; i++) {
    posOptions.push(<MenuItem value={+i}>+{i}</MenuItem>);
    negOptions.push(<MenuItem value={-i}>-{i}</MenuItem>);
  }

  mods.push(
    <>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="positive-bonus-label">+ Bonus </InputLabel>
          <Select
            labelId="positive-bonus-label"
            className="mod-button select-mod"
            variant="outlined"
            value={"+ Bonus"}
          >
            {posOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="negative-bonus-label">- Bonus</InputLabel>
          <Select
            labelId="negative-bonus-label"
            className="mod-button select-mod"
            value={"- Bonus"}
            variant="outlined"
          >
            {negOptions}
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <Card className="monster">
      <CardContent style={{ paddingLeft: ".25em", paddingRight: ".25em" }}>
        <Typography variant="h5" style={{ display: "inline" }}>
          Ability Roll <DieIcon roll={{ sides: 20, roll: 20 }} />|
          <DieIcon roll={{ sides: 20, roll: 20 }} />
        </Typography>
        <Grid container className="mod-grid" spacing={2}>
          {mods}
        </Grid>
      </CardContent>
    </Card>
  );
}

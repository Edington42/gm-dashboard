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
import { ChangeEvent, ReactElement, useContext, useState } from "react";
import { DieIcon } from "../../common/DieIcon";
import { RollLogContext } from "../../context/RollLogContext";
import { ABILITY_ROLL_DEFAULT, rollToIconClass } from "../../util/Roller";

const BUTTON_MOD_MAX = 5;
const MOD_MAX = 30;

export function AbilityRollCard() {
  const mods: ReactElement[] = [];
  const [posCustomMod, setPosCustomMod] = useState<number>(0);
  const [negCustomMod, setNegCustomMod] = useState<number>(0);
  const { logRoll } = useContext(RollLogContext);

  function handleChange(valueString: string) {
    let value: number = parseInt(valueString);
    value > 0 ? setPosCustomMod(value) : setNegCustomMod(value);
  }

  function roll(modifier: number) {
    logRoll({
      rolls: [
        {
          ...ABILITY_ROLL_DEFAULT,
          bonus: modifier,
        },
      ],
    });
  }

  for (let i = 0; i < BUTTON_MOD_MAX + 1; i++) {
    mods.push(
      <>
        <Grid item xs={6}>
          <Button
            onClick={() => roll(i)}
            variant="contained"
            className="mod-button"
          >
            +{i}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => roll(-i)}
            variant="outlined"
            className="mod-button"
          >
            -{i}
          </Button>
        </Grid>
      </>
    );
  }

  const posOptions: JSX.Element[] = [];
  const negOptions: JSX.Element[] = [];

  for (let i = BUTTON_MOD_MAX; i < MOD_MAX; i++) {
    posOptions.push(
      <MenuItem onClick={() => roll(i)} value={+i}>
        +{i}
      </MenuItem>
    );
    negOptions.push(
      <MenuItem onClick={() => roll(-i)} value={-i}>
        -{i}
      </MenuItem>
    );
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
            value={posCustomMod}
            onChange={(event) => handleChange(event.target.value as string)}
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
            value={negCustomMod}
            onChange={(event) => handleChange(event.target.value as string)}
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
        <Typography variant="h6" style={{ display: "inline" }}>
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

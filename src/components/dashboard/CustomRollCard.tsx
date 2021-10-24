import {
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Badge,
} from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { ChangeEvent, ReactElement, useContext, useState } from "react";
import { DieIcon } from "../../common/DieIcon";
import { RollLogContext } from "../../context/RollLogContext";
import {
  ABILITY_ROLL_DEFAULT,
  Dice,
  DiceRoll,
  DiceRollDetails,
  rollToIconClass,
} from "../../util/Roller";

const BUTTON_COUNT_MAX = 5;
const COUNT_MAX = 30;

const DICE: number[] = [4, 6, 8, 10, 12];

export function CustomRollCard() {
  const counts: ReactElement[] = [];
  const initialDiceCounts = DICE.map((die) => {
    return 0;
  });
  const [diceCounts, setDiceCounts] = useState<number[]>(initialDiceCounts);
  const { logRoll } = useContext(RollLogContext);

  function handleChange(valueString: string, die: number) {
    let value: number = parseInt(valueString);
    let newCounts = [...diceCounts];
    newCounts[die] = value;
    setDiceCounts(newCounts);
  }

  function roll(count: number, die: number) {
    let dice: Dice = { count: count, sides: DICE[die] };
    logRoll({
      rolls: [
        {
          rolls: 1,
          toRoll: [dice],
          bonus: 0,
        },
      ],
    });
  }

  for (let i = 1; i < BUTTON_COUNT_MAX + 1; i++) {
    for (let j = 0; j < DICE.length; j++)
      counts.push(
        <>
          <Grid item xs={2}>
            <Button
              onClick={() => roll(i, j)}
              variant="contained"
              className="count-button"
            >
              {i}
              <DieIcon roll={{ roll: DICE[j], sides: DICE[j] }} />
            </Button>
          </Grid>
        </>
      );
  }

  const options: JSX.Element[][] = [];

  for (let i = 0; i < DICE.length; i++) {
    let optionList: JSX.Element[] = [];
    for (let j = BUTTON_COUNT_MAX; j < COUNT_MAX; j++) {
      optionList.push(
        <MenuItem className="select-count" onClick={() => roll(j, i)} value={j}>
          <Typography variant="caption">{j}</Typography>
        </MenuItem>
      );
    }
    counts.push(
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id={"d" + DICE[i] + "-label"}>
            <DieIcon roll={{ roll: DICE[i], sides: DICE[i] }} />
          </InputLabel>
          <Select
            labelId="positive-bonus-label"
            className="mod-button select-count"
            variant="outlined"
            value={diceCounts[i]}
            onChange={(event) => handleChange(event.target.value as string, i)}
          >
            {optionList}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  let icons = DICE.map((die) => (
    <DieIcon key={die} roll={{ sides: die, roll: die }} />
  ));

  return (
    <Card className="monster">
      <CardContent style={{ paddingLeft: ".25em", paddingRight: ".25em" }}>
        <Typography variant="h6" style={{ display: "inline" }}>
          Custom Roll {icons}
        </Typography>
        <Grid container className="count-grid" spacing={0} columns={10}>
          {counts}
        </Grid>
      </CardContent>
    </Card>
  );
}

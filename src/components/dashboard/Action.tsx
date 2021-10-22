import { useContext, useState } from "react";
import { ActionDetails, RollLogContext } from "../../context/RollLogContext";
import {
  ABILITY_ROLL_DEFAULT,
  DiceRollDetails,
  rollDice,
  textToDice,
} from "../../util/Roller";
import { ActionData } from "../../data/ActionData";
import {
  Collapse,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
//import { ArrowDropDownIcon, ArrowDropUpIcon } from "@material-ui/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CasinoIcon from "@mui/icons-material/Casino";
import { ListItemButton, ListItemIcon } from "@mui/material";

interface IProps {
  action: ActionData;
}

function toDetails(data: ActionData): ActionDetails {
  let rolls: DiceRollDetails[] = [];
  rolls.push({
    ...ABILITY_ROLL_DEFAULT,
    rollTitle: "To Hit:",
    bonus: data.attack_bonus,
  });

  rolls.push({
    rollTitle: "Damage:",
    bonus: data.damage_bonus,
    toRoll: [textToDice(data.damage_dice)],
    rolls: 1,
  });

  return {
    monsterName: data.monsterName,
    actionName: data.name,
    rolls: rolls,
  };
}

export function Action({ action }: IProps) {
  const [expanded, setExpanded] = useState(false);
  const { logRoll } = useContext(RollLogContext);

  function toggleExpand() {
    console.log("Expand");
    setExpanded(!expanded);
  }

  function roll(stats: ActionData) {
    logRoll(toDetails(stats));
  }

  return (
    <>
      <ListItem style={{ padding: "0px", paddingRight: "4px" }}>
        <ListItemButton
          style={{ padding: "0px", paddingRight: "4px" }}
          title={action.desc}
          onClick={(e) => roll(action)}
        >
          <ListItemIcon>
            <CasinoIcon />
          </ListItemIcon>
          <ListItemText primary={action.name} />

          {/* <Typography variant="h6" className="icon" style={{ display: "inline" }}>
        {action.name}
      </Typography> */}
          {/* <img
        src={expanded ? popIn : popOut}
        className="icon"
        onClick={toggleExpand}
      /> */}
        </ListItemButton>
        {expanded ? (
          <ArrowDropUpIcon onClick={toggleExpand} />
        ) : (
          <ArrowDropDownIcon onClick={toggleExpand} />
        )}
      </ListItem>
      <Collapse in={expanded}>
        <Typography variant="body1">{action.desc}</Typography>
      </Collapse>
    </>
  );
}

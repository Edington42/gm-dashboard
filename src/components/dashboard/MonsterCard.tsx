import { useContext, useState } from "react";
import { ActionArea } from "./ActionArea";
import { Card, CardContent, Collapse } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@material-ui/core";
import { EditContext } from "../../context/EditContext";
import { DashboardContext, DashboardItem } from "../../context/DashboarContex";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { StatBlock } from "../stats/StatBlock";

interface IProps {
  stats: DashboardItem;
}

export function MonsterCard({ stats }: IProps) {
  const { editSaved } = useContext(EditContext);
  const { deleteMonster } = useContext(DashboardContext);
  const [expanded, setExpanded] = useState(false);
  function toggleExpand() {
    console.log("Expand");
    setExpanded(!expanded);
  }

  return (
    <Card className="monster">
      <CardContent style={{ paddingLeft: ".25em", paddingRight: ".25em" }}>
        <Typography variant="h5" style={{ display: "inline" }}>
          {stats.name}
        </Typography>
        <EditIcon
          onClick={(e) => editSaved(stats)}
          style={{ float: "right", margin: ".25em" }}
        />
        <DeleteIcon
          onClick={(e) => deleteMonster(stats.id)}
          style={{ float: "right", margin: ".25em" }}
        />
        <Typography style={{ display: "block" }}>
          AC: {stats.armor_class} HP: {stats.hit_points}
          {expanded ? (
            <ArrowDropUpIcon onClick={toggleExpand} />
          ) : (
            <ArrowDropDownIcon onClick={toggleExpand} />
          )}
        </Typography>

        <Collapse in={expanded}>
          <StatBlock stats={stats} />
        </Collapse>
        <ActionArea monster={stats} />
      </CardContent>
    </Card>
  );
}

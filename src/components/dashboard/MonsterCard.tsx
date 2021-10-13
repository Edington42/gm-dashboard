import { useContext } from "react";
import { ActionArea } from "./ActionArea";
import { Card, CardContent } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@material-ui/core";
import { EditContext } from "../../context/EditContext";
import { DashboardContext, DashboardItem } from "../../context/DashboarContex";

interface IProps {
  stats: DashboardItem;
}

export function MonsterCard({ stats }: IProps) {
  const { editSaved } = useContext(EditContext);
  const { deleteMonster } = useContext(DashboardContext);

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
        </Typography>
        <ActionArea monster={stats} />
      </CardContent>
    </Card>
  );
}

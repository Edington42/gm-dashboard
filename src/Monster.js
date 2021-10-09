import React from "react";
import { ActionArea } from "./ActionArea";
import trash from "./delete.svg";
import edit from "./edit.svg";
import { Card, CardContent } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@material-ui/core";

export function Monster({ key, stats, deleteMonster, editSaved }) {
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
        <Typography variant="body" style={{ display: "block" }}>
          AC: {stats.armor_class} HP: {stats.hit_points}
        </Typography>
        <ActionArea stats={stats} />
      </CardContent>
    </Card>
  );
}

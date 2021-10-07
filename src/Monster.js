import React from "react";
import { ActionArea } from "./ActionArea";
import trash from "./delete.svg";
import edit from "./edit.svg";
import { Card, CardContent } from "@material-ui/core";

export function Monster({ key, stats, deleteMonster, editSaved }) {
  return (
    <Card className="monster">
      <CardContent>
        <h3>{stats.name}</h3>
        <p>
          AC: {stats.armor_class} HP: {stats.hit_points}
        </p>
        <img
          src={trash}
          className="icon"
          onClick={(e) => deleteMonster(stats.id)}
        />
        <img src={edit} className="icon" onClick={(e) => editSaved(stats)} />
      </CardContent>
      <CardContent>
        <ActionArea stats={stats} />
      </CardContent>
    </Card>
  );
}

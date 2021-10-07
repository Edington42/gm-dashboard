import React from "react";
import { Monster } from "./Monster";

export function MonsteArea({ monsters, deleteMonster, editSaved }) {
  let area = monsters.map((monster, index) => (
    <Monster
      key={index}
      stats={monster}
      deleteMonster={deleteMonster}
      editSaved={editSaved}
    />
  ));
  return <div className="monster-area">{area}</div>;
}

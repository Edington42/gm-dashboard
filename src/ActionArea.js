import React from "react";
import { Action } from "./Action";
import { List } from "@material-ui/core";

export function ActionArea({ stats }) {
  let actions = [
    ...stats.actions,
    ...stats.reactions,
    ...stats.legendary_actions,
  ];
  let area = actions.map((action) => (
    <Action key={action.name} action={action} />
  ));
  return <List>{area}</List>;
}

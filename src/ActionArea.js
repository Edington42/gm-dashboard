import React from "react";
import { Action } from "./Action";

export function ActionArea({ stats }) {
  let actions = [
    ...stats.actions,
    ...stats.reactions,
    ...stats.legendary_actions,
  ];
  let area = actions.map((action) => (
    <div>
      <Action key={action.name} action={action} />
    </div>
  ));
  return <div>{area}</div>;
}

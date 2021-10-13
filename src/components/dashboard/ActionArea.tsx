import { Action } from "./Action";
import { List } from "@material-ui/core";
import { MonsterData } from "../../data/MonsterData";

interface IProps {
  monster: MonsterData;
}

export function ActionArea({ monster }: IProps) {
  let actions = [
    ...monster.actions,
    ...monster.reactions,
    ...monster.legendary_actions,
  ];
  let area = actions.map((action) => (
    <Action key={action.name} action={action} />
  ));
  return <List>{area}</List>;
}

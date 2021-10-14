import { Typography } from "@material-ui/core";
import { DieRoll } from "../../util/Roller";

interface IProps {
  rolls: DieRoll[];
}

export function RollText({ rolls }: IProps) {
  return <p className="roll-text">5+7+9</p>;
}

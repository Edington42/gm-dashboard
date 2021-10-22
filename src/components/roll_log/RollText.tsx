import { Typography } from "@material-ui/core";
import { DieRoll, rollToIconClass } from "../../util/Roller";
import "../../dicefont/dicefont.css";
import { DieIcon } from "../../common/DieIcon";
import { Fragment } from "react";

interface IProps {
  rolls: DieRoll[];
}

export function RollText({ rolls }: IProps) {
  let rollIcons = rolls.map((roll, index) => (
    <Fragment>
      {index === 0 ? "" : "+"}
      <DieIcon key={index} roll={roll} />
    </Fragment>
  ));

  return <>{rollIcons}</>;
}

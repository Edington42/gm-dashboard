import { DieRoll, rollToIconClass } from "../util/Roller";
import "./css/DieIcon.css";

interface IProps {
  roll: DieRoll;
}
export function DieIcon({ roll }: IProps) {
  return <i className={rollToIconClass(roll) + " die-icon"} />;
}

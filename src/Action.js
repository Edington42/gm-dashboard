import React, { useContext, useState } from "react";
import popOut from "./pop-out.svg";
import popIn from "./pop-in.svg";
import die from "./die.svg";
import { RollLogContext } from "./RollLogContext";
import { D20, rollDice, textToDie } from "./Roller";

export function Action({ action }) {
  const [expanded, setExpanded] = useState(false);
  const { logRoll } = useContext(RollLogContext);

  function toggleExpand() {
    console.log("Expand");
    setExpanded(!expanded);
  }

  function roll(stats) {
    let toHit = rollDice([D20], stats.attack_bonus);
    let adDis = rollDice([D20], stats.attack_bonus);
    let damage = rollDice([textToDie(stats.damage_dice)], stats.damage_bonus);

    let toHitText =
      stats.name + " to hit: " + toHit.display + " " + adDis.display;
    let damageText = "\t" + stats.name + " damage: " + damage.display;
    logRoll(damageText);
    logRoll(toHitText);
  }

  return (
    <div title={action.desc}>
      <img src={die} className="icon" onClick={(e) => roll(action)} />
      {expanded ? action.name + ": " + action.desc : action.name}
      <img
        src={expanded ? popIn : popOut}
        className="icon"
        onClick={toggleExpand}
      />
    </div>
  );
}

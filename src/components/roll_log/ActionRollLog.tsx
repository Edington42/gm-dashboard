import { Typography } from "@material-ui/core";
import { ActionResults } from "../../context/RollLogContext";
import { ActionRollLogItem } from "./ActionRollLogItem";
import { ActionRollTitle } from "./ActionRollTitle";

export function ActionRollLog({
  actionResults,
}: {
  actionResults: ActionResults;
}) {
  let hasTitle: boolean =
    actionResults.monsterName != undefined ||
    actionResults.actionName != undefined;

  let rollText = actionResults.rolls.map((roll, index) => (
    <>
      <ActionRollLogItem titled={hasTitle} key={index} rolls={roll} />
    </>
  ));
  return (
    <>
      <ActionRollTitle
        actorName={actionResults.monsterName}
        actionName={actionResults.actionName}
      />
      {rollText}
    </>
  );
}

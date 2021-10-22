import { Typography } from "@material-ui/core";

export function ActionRollTitle({
  actorName,
  actionName,
}: {
  actorName?: string;
  actionName?: string;
}) {
  if (!actorName && !actionName) {
    return <></>;
  }

  let titleString = "";
  if (actorName && actionName) {
    titleString = actorName + " - " + actionName + ":";
  } else if (actorName) {
    titleString = actorName + ":";
  } else {
    titleString = actionName + ":";
  }

  return <Typography variant="h6"> {titleString}</Typography>;
}

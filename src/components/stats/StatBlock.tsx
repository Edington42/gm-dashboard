import { Divider, Grid, Typography } from "@material-ui/core";
import { statSync } from "fs";
import { MonsterData } from "../../data/MonsterData";

export function StatBlock({ stats }: { stats: MonsterData }) {
  let speeds = Object.entries(stats.speed).map(([key, value]) => (
    <Typography key={key} variant="body1">
      {key}:{" " + value}ft
    </Typography>
  ));

  function absToString(abs: number) {
    let mod = absToMod(abs);
    return abs + " (" + (mod >= 0 ? "+" : "-") + Math.abs(mod) + ")";
  }

  function absToMod(abs: number) {
    return Math.floor((abs - 10) / 2);
  }

  function svToMod(sv: number | null, abs: number) {
    if (sv === null) {
      sv = absToMod(abs);
    }
    return " (" + (sv >= 0 ? "+" : "-") + Math.abs(sv) + ")";
  }

  let statNames = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  let statValues = [
    absToString(stats.strength),
    absToString(stats.dexterity),
    absToString(stats.constitution),
    absToString(stats.intelligence),
    absToString(stats.wisdom),
    absToString(stats.charisma),
  ];
  let saveNames = ["STRsv", "DEXsv", "CONsv", "INTsv", "WISsv", "CHAsv"];
  let saveValues = [
    svToMod(stats.strength_save, stats.strength),
    svToMod(stats.dexterity_save, stats.dexterity),
    svToMod(stats.constitution_save, stats.constitution),
    svToMod(stats.intelligence_save, stats.intelligence),
    svToMod(stats.wisdom_save, stats.wisdom),
    svToMod(stats.charisma_save, stats.charisma),
  ];

  let statNameLabels = statNames.map((name) => (
    <Grid item key={name} xs={2}>
      <Typography variant="body1">{name}</Typography>
    </Grid>
  ));

  let statValueLabels = statValues.map((value, index) => (
    <Grid item key={index} xs={2}>
      <Typography variant="caption">{value}</Typography>
    </Grid>
  ));

  let saveNameLabels = saveNames.map((name) => (
    <Grid item key={name} xs={2}>
      <Typography variant="body2">{name}</Typography>
    </Grid>
  ));

  let saveValueLabels = saveValues.map((value, index) => (
    <Grid item key={index} xs={2}>
      <Typography variant="caption">{value}</Typography>
    </Grid>
  ));

  let prof = Object.entries(stats.skills).map(([key, value]) => (
    <Typography key={key} variant="body1">
      {key}:{" " + value}
    </Typography>
  ));

  return (
    <>
      <Divider light />
      {speeds}
      <Divider light />
      <Grid container className="count-grid" spacing={0}>
        {statNameLabels}
        {statValueLabels}
        <Grid item xs={12}>
          <Divider light />
        </Grid>
        {saveNameLabels}
        {saveValueLabels}
      </Grid>
      <Divider light />
      {prof.length > 0 && (
        <>
          {prof}
          <Divider light />
        </>
      )}

      {stats.damage_vulnerabilities && (
        <>
          <Typography>
            Damage Vulnerabilities:{" " + stats.damage_vulnerabilities}
          </Typography>
          <Divider light />
        </>
      )}
      {stats.damage_resistances && (
        <>
          <Typography>
            Damage Resitatnces:{" " + stats.damage_resistances}
          </Typography>
          <Divider light />
        </>
      )}
      {stats.damage_immunities && (
        <>
          <Typography>
            Damage Immunities:{" " + stats.damage_immunities}
          </Typography>
          <Divider light />
        </>
      )}
    </>
  );
}

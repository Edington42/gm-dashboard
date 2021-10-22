import { useContext } from "react";
import { DashboardContext, DashboardItem } from "../../context/DashboarContex";
import { AbilityRollCard } from "./AbilityRollCard";
import { MonsterCard } from "./MonsterCard";
import "./css/Dashboard.css";

export function MonsteArea() {
  const { dash } = useContext(DashboardContext);

  let area = dash.map((monster: DashboardItem, index) => (
    <MonsterCard key={index} stats={monster} />
  ));
  return (
    <div className="monster-area">
      <AbilityRollCard />
      {area}
    </div>
  );
}

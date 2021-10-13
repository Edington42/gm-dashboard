import { useContext } from "react";
import { DashboardContext, DashboardItem } from "../../context/DashboarContex";
import { MonsterCard } from "./MonsterCard";

export function MonsteArea() {
  const { dash } = useContext(DashboardContext);

  let area = dash.map((monster: DashboardItem, index) => (
    <MonsterCard key={index} stats={monster} />
  ));
  return <div className="monster-area">{area}</div>;
}

import React, { ChangeEvent, createContext, useState } from "react";
import { MonsterData } from "../data/MonsterData";

export interface DashboardContent {
  dash: DashboardItem[];
  clearDash: () => void;
  exportDash: () => void;
  importDash: (e: ChangeEvent<HTMLInputElement>) => void;
  saveMonster: (monsterText: string) => void;
  deleteMonster: (id: number) => void;
}

export const DashboardContext = createContext<DashboardContent>({
  dash: [],
  clearDash: () => {},
  exportDash: () => {},
  importDash: (e: ChangeEvent<HTMLInputElement>) => {},
  saveMonster: (monsterText: string) => {},
  deleteMonster: (id: number) => {},
});

export interface DashboardItem extends MonsterData {
  id: number;
}

export const DashboardProvider: React.FC<{}> = ({ children }) => {
  const dashInit = localStorage.getItem("dash");
  const [dash, setDash] = useState<DashboardItem[]>(
    dashInit ? JSON.parse(dashInit) : []
  );

  function clearDash() {
    localStorage.removeItem("dash");
    setDash([]);
  }

  function exportDash() {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(dash)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "Dashboard";
    a.click();
  }

  function importDash(e: ChangeEvent<HTMLInputElement>) {
    if (e.target !== null && e.target.files !== null) {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (
          e !== null &&
          e.target !== null &&
          typeof e.target.result === "string"
        ) {
          const text = e.target.result;
          localStorage.setItem("dash", text);
          setDash(JSON.parse(text));
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  }

  function saveMonster(monsterText: string) {
    let toSave = JSON.parse(monsterText);
    let id = dash.length;
    toSave.id = id;
    let newArray = [...dash, toSave];
    setDash(newArray);
    localStorage.setItem("dash", JSON.stringify(newArray));
  }

  function deleteMonster(id: number) {
    let newArray = dash.filter((item) => item.id !== id);
    setDash(newArray);
    localStorage.setItem("dash", JSON.stringify(newArray));
  }

  return (
    <DashboardContext.Provider
      value={{
        dash,
        clearDash,
        exportDash,
        importDash,
        saveMonster,
        deleteMonster,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

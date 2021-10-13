import React, { ChangeEvent, createContext, useState } from "react";
import { MonsterData } from "../data/MonsterData";

export interface EditContenet {
  isEditing: boolean;
  editText: string;
  editSaved: (stats: MonsterData) => void;
  textChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  toggleEdit: () => void;
  setEditText: (text: string) => void;
}

export const EditContext = createContext<EditContenet>({
  isEditing: false,
  editText: "",
  editSaved: (stats: MonsterData) => {},
  textChange: (e: ChangeEvent<HTMLTextAreaElement>) => {},
  toggleEdit: () => {},
  setEditText: (text: string) => {},
});

export const EditProvider: React.FC<{}> = ({ children }) => {
  const [editText, setEditText] = useState("");
  const [isEditing, setEditing] = useState(false);

  function editSaved(stats: MonsterData) {
    setEditing(true);
    setEditText(JSON.stringify(stats));
  }

  function textChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setEditText(e.target.value);
  }

  function toggleEdit() {
    setEditing(!isEditing);
  }

  return (
    <EditContext.Provider
      value={{
        editText,
        isEditing,
        editSaved,
        textChange,
        toggleEdit,
        setEditText,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

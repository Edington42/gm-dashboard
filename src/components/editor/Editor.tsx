import { useContext } from "react";
import { EditContext } from "../../context/EditContext";

export function Editor() {
  const { isEditing, editText, textChange } = useContext(EditContext);

  return (
    <div>
      {isEditing && (
        <div className="search">
          <textarea
            className="edit-area"
            rows={10}
            onChange={textChange}
            value={editText}
          />
        </div>
      )}
    </div>
  );
}

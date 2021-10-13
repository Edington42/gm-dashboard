import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboarContex";
import { EditContext } from "../../context/EditContext";

interface IProps {
  anchorEl: Element | null;
  isOpen: boolean;
  handleClose: () => void;
}

export function HeaderMenu({ anchorEl, isOpen, handleClose }: IProps) {
  const { clearDash, importDash, exportDash } = useContext(DashboardContext);

  const { isEditing, toggleEdit } = useContext(EditContext);

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
      <MenuItem onClick={toggleEdit}>
        {isEditing ? "Hide Edit" : "Show Edit"}
      </MenuItem>
      <MenuItem onClick={clearDash}>Clear Dashboard</MenuItem>
      <MenuItem onClick={exportDash}>Export Dashboard</MenuItem>
      <MenuItem>
        <label htmlFor="contained-button-file">
          <input
            id="contained-button-file"
            type="file"
            hidden
            onInput={importDash}
          />
          Import Dashboard
        </label>
      </MenuItem>
    </Menu>
  );
}

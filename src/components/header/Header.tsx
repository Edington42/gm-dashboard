import {
  useState,
  MouseEvent,
  ChangeEvent,
  useEffect,
  ReactElement,
  useContext,
} from "react";
import { MonsterData } from "../../data/MonsterData";
import { AppBar, Toolbar, Box } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DashboardContext } from "../../context/DashboarContex";
import { EditContext } from "../../context/EditContext";
import { HeaderMenu } from "./HeaderMenu";

export function Header() {
  const [monsterList, setMonsterList] = useState<MonsterData[]>();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.target as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { saveMonster } = useContext(DashboardContext);

  const { editText, setEditText } = useContext(EditContext);

  /* Begin Fetches */
  useEffect(() => {
    fetch(
      "https://api.open5e.com/monsters/?format=json&fields=slug,name&limit=10000"
    )
      .then((response) => response.json())
      .then((data) => {
        let monsters = data.results;
        setMonsterList(monsters);
      });
  }, []);

  function changeSelect(e: ChangeEvent<HTMLSelectElement>) {
    fetch("https://api.open5e.com/monsters/?name=" + e.target.value)
      .then((response) => response.json())
      .then((data) => {
        setEditText(JSON.stringify(data.results[0]));
      });
  }
  /* End Fetches */

  let names: ReactElement[] = [];
  if (monsterList !== null && monsterList !== undefined) {
    names = monsterList.map((value: MonsterData) => (
      <option key={value.name}>{value.name}</option>
    ));
  }

  return (
    <AppBar position="static" className="app-header">
      <Toolbar className="tool">
        <Box className="header-left">
          <select onChange={changeSelect}>
            <option value="" disabled selected>
              Select a Monster
            </option>
            {names}
          </select>
          <AddCircleIcon
            fontSize="large"
            className="header-icon"
            onClick={(e) => saveMonster(editText)}
          />
        </Box>
        <IconButton className="menu" onClick={handleClick}>
          <MoreVertIcon fontSize="large" />
        </IconButton>
      </Toolbar>
      <HeaderMenu
        isOpen={isOpen}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </AppBar>
  );
}

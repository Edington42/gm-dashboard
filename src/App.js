import "./App.css";
import { useState, useEffect, useContext } from "react";
import { MonsteArea } from "./MonsteArea";
import { RollLogContext } from "./RollLogContext";
import {
  AppBar,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Input,
  Box,
  Button,
} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/*TODOS
 * Add clear dash
 * clean up files
 * upgrade to typescript
 * die type in roll log
 * parse non-exlicit rolls
 * clean up console errors
 * full stat popout
 * Drag and drop cards
 * Update edit text visual design
 * Clean up dependencies
 * Hide/unlock rolls while editing fields?
 * Top bar burger bar for
 * Add/edit icons for top bar
 * Top right menu hides easily
 *
 *
 *
 *
 *
 *
 *
 */

const ITEM_HEIGHT = 48;

function App() {
  const dashInit = localStorage.getItem("dash");
  const [monsterList, setMonsterList] = useState([]);
  const [selection, setSelection] = useState("");
  const [selectionText, setSelectionText] = useState("");
  const [dash, setDash] = useState(dashInit ? JSON.parse(dashInit) : []);
  const [edit, setEdit] = useState(false);
  const [searchOpen, setSearchOpen] = useState(true);
  const { rollLog } = useContext(RollLogContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const exportDash = () => {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(dash)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "Dashboard";
    a.click();
  };

  function importDash(e) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      localStorage.setItem("dash", text);
      setDash(JSON.parse(text));
    };
    reader.readAsText(e.target.files[0]);
  }

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

  function changeSelect(event) {
    fetch("https://api.open5e.com/monsters/?name=" + event.target.value)
      .then((response) => response.json())
      .then((data) => {
        setSelection(data.results[0]);
        setSelectionText(JSON.stringify(data.results[0]));
      });
  }

  let names = monsterList.map((value, key) => (
    <option key={value.name}>{value.name}</option>
  ));

  function saveMonster() {
    let toSave = JSON.parse(selectionText);
    let id = dash.length;
    toSave.id = id;
    let newArray = [...dash, toSave];
    setDash(newArray);
    localStorage.setItem("dash", JSON.stringify(newArray));
  }

  function deleteMonster(id) {
    let newArray = dash.filter((item) => item.id !== id);
    setDash(newArray);
    localStorage.setItem("dash", JSON.stringify(newArray));
  }

  function editSaved(stats) {
    setEdit(true);
    setSelectionText(JSON.stringify(stats));
  }

  let actions = <p>No Actions</p>;
  if (selection !== "") {
    actions = selection.actions.map((value) => (
      <div>
        <h2>{value.name}</h2>
      </div>
    ));
  }

  function textChange(e) {
    setSelectionText(e.target.value);
  }

  function toggleEdit() {
    setEdit(!edit);
  }

  function toggleSearch() {
    setSearchOpen(!searchOpen);
  }

  return (
    <div className="app">
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
              onClick={saveMonster}
            />
          </Box>
          <IconButton className="menu" onClick={handleClick}>
            <MoreVertIcon fontSize="large" />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={toggleEdit}>
              {edit ? "Show Edit" : "Hide Edit"}
            </MenuItem>
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
        </Toolbar>
      </AppBar>
      <div className="contain">
        <div>
          {edit && (
            <div className="search">
              <textarea
                className="edit-area"
                rows={10}
                onChange={textChange}
                value={selectionText}
              />
            </div>
          )}
        </div>
        <MonsteArea
          monsters={dash}
          deleteMonster={deleteMonster}
          editSaved={editSaved}
        />
      </div>
      <div className="sticky">
        <TextField
          label="Rolls"
          variant="outlined"
          className="scroller"
          multiline
          value={rollLog}
          inputProps={{ readOnly: true }}
          rows={6}
          rowsMax={6}
        ></TextField>
      </div>
    </div>
  );
}

export default App;

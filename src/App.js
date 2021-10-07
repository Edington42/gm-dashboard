import logo from "./logo.svg";
import "./App.css";
import Tesseract from "tesseract.js";
import rhino from "./Rhino.txt";
import { useState, useEffect, useContext } from "react";
import { MonsteArea } from "./MonsteArea";
import { RollContext } from "./RollContext";
import { RollLogContext } from "./RollLogContext";
import {
  AppBar,
  Tab,
  Tabs,
  TextField,
  Typography,
  Toolbar,
  Card,
} from "@material-ui/core";

/*TODOS
 * Update monster cards visual design
 * clean up files
 * upgrade to typescript
 * clean up console errors
 * full stat popout
 * name in roll
 * die type in roll log
 * Add export/import dash
 * parse non-exlicit rolls
 * Update edit text visual design
 *
 *
 *
 *
 *
 *
 *
 */

function App() {
  const dashInit = localStorage.getItem("dash");
  const [monsterList, setMonsterList] = useState([]);
  const [selection, setSelection] = useState("");
  const [selectionText, setSelectionText] = useState("");
  const [dash, setDash] = useState(dashInit ? JSON.parse(dashInit) : []);
  const [edit, setEdit] = useState(false);
  const [searchOpen, setSearchOpen] = useState(true);
  const { rollLog } = useContext(RollLogContext);

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
        {/*<h3>+ {value.attack_bonus} To Hit {value.damage_dice}
        <button onClick={((e) => roll(value.attack_bonus,12))}>Roll</button>
      </h3>
  <p>{value.desc}</p>*/}
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

  // const logs = rollLog.map((log, index) => (
  //   <div key={index}>
  //     {log} <br />
  //   </div>
  // ));

  return (
    <>
      <AppBar position="static" className="app-header">
        <Toolbar>
          <select onChange={changeSelect}>
            <option value="" disabled selected>
              Select a Monster
            </option>
            {names}
          </select>
          <Tabs>
            <Tab onClick={saveMonster} label="Add" />
            <Tab
              className="header-toggle"
              onClick={toggleEdit}
              label={edit ? "Hide Edit" : "Show Edit"}
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      <div className="App">
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
      <Card className="sticky">
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
      </Card>
    </>
  );
}

export default App;

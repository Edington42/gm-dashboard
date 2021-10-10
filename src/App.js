import "./App.css";
import { useState, useEffect, useContext } from "react";
import { MonsteArea } from "./MonsteArea";
import { RollLogContext } from "./RollLogContext";
import { AppBar, Tab, Tabs, TextField, Toolbar } from "@material-ui/core";

/*TODOS
 * Add export/import dash
 * Adaptable tool bar
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

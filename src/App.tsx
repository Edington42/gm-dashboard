import "./App.css";
import { MonsteArea } from "./components/dashboard/MonsteArea";

import { Header } from "./components/header/Header";
import { Editor } from "./components/editor/Editor";

/*TODOS
 *
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
 * apply type doc
 * Organize css
 *
 *
 */

const ITEM_HEIGHT = 48;

function App() {
  return (
    <div className="app">
      <Header />
      <div className="contain">
        <Editor />
        <MonsteArea />
      </div>
    </div>
  );
}

export default App;

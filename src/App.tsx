import "./App.css";
import { MonsteArea } from "./components/dashboard/MonsteArea";
import { Header } from "./components/header/Header";
import { Editor } from "./components/editor/Editor";
import { RollLog } from "./components/roll_log/RollLog";

/*TODOS
 *
 * Add card for basic rolls
 * add notes for description/attack descriptions/phrases
 * Spells
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
 * Improve readability of roll log
 * apply type doc
 * Organize css
 *
 *
 */

function App() {
  return (
    <div className="app">
      <Header />
      <div className="contain">
        <Editor />
        <MonsteArea />
      </div>
      <RollLog />
    </div>
  );
}

export default App;

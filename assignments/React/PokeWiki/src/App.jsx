import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <h1>PokeWiki</h1>
      </header>
      <Outlet />
    </>
  );
}

export default App;

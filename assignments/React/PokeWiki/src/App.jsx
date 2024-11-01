import { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  // useEffect(() => {
  //   fetchPokemonList();
  // }, []);

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

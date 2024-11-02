import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-black px-28">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

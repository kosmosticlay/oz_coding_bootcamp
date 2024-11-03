import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="w-full relative">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

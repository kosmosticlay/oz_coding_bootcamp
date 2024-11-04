import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopBtn from "./components/commons/ScrollToTopBtn";

function App() {
  return (
    <div className="w-full relative">
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopBtn />
    </div>
  );
}

export default App;

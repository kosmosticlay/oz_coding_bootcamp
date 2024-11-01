import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { homeLoader } from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Search from "./pages/Search.jsx";
import Favorites from "./pages/Favorites.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />, // 에러 처리 컴포넌트
    children: [
      { path: "", element: <Home />, loader: homeLoader }, // 메인 페이지
      { path: "detail/:id", element: <Detail /> }, // 선택된 포켓몬 상세 정보
      { path: "search", element: <Search /> }, // 검색 페이지
      { path: "favorites", element: <Favorites /> }, // 즐겨찾기 페이지
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

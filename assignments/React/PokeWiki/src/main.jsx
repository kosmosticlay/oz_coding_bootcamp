import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Search from "./pages/Search.jsx";
import Favorites from "./pages/Favorites.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Provider } from "react-redux";
import store from "./RTK/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />, // 에러 처리 컴포넌트
    children: [
      { path: "", element: <Home /> }, // 메인 페이지
      { path: "search", element: <Search /> }, // 검색 페이지
      { path: "favorites", element: <Favorites /> }, // 즐겨찾기 페이지
    ],
  },
  {
    path: "detail/:name",
    element: <Detail />,
    errorElement: <NotFound />, // 선택된 포켓몬 상세 정보
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

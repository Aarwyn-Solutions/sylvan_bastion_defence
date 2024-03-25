import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import OldApp from "./OldApp";
import ErrorPage from "./components/ErrorPage";
import Start from "./components/StartPage";
import Heroes from "./components/HeroesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<Start />} />
      <Route path="/heroes" element={<Heroes />} />
      <Route path="/old" element={<OldApp />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

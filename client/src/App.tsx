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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<Start />} />
      <Route path="/old" element={<OldApp />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

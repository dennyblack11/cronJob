import { createBrowserRouter } from "react-router-dom";
import { Register } from "../Pages/Register";
import { Pricing } from "../Pages/Pricing";

export const Router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Pricing />,
  },
  {
    path: "/upgrade",
    element: <Pricing />,
  },
]);

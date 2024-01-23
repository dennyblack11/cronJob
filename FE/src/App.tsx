import { RouterProvider } from "react-router-dom";
import { Router } from "./router/mainRoute";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;

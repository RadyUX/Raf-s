
import { createBrowserRouter, RouterProvider
  , Route
 } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";

 const router = createBrowserRouter([
  {

  path: "/login",
  element: <Login />,
  },
  {

    path: "/register",
    element: <Register />,
    },
]);
function App() {

  

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App

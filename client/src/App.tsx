
import { createBrowserRouter, RouterProvider
  , Outlet
 } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./index.css"
import Write from "./pages/Write";
import Single from "./pages/Single";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/post/:id",
        element: <Single/>,
      },
  
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  
]);
function App() {

  

  return (
    <div className="app w-full  ">
      <div className="w-full  ">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App

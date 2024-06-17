
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

const Navbar = () => {
    
    const authContext = useContext(AuthContext);

    const { currentUser, logout} = authContext;


    const handleLogout = () => {
        logout();
         // Il sera null après la déconnexion
      };

      console.log(currentUser);
  return (
    
    <div className="navbar w-[100vw] bg-slate-500">
         <h1>{currentUser?.user?.name}</h1>
      <div className="container flex justify-around ">
        <div className="logo">
          <Link to="/">
       <p>logo</p>
          </Link>
        </div>
        <div className="links flex gap-5">
          <Link className="link" to="/about">
            <h6>A propos</h6>
          </Link>
        
          <span>{currentUser?.user?.name}</span>
          {currentUser ? (
            <span onClick={handleLogout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Ecrire
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};


export default Navbar
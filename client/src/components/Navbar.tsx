
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
    
    <div className="navbar">
         <h1>{currentUser?.user.name}</h1>
      <div className="container">
        <div className="logo">
          <Link to="/">
       <p>logo</p>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=framework">
            <h6>Framework</h6>
          </Link>
          <Link className="link" to="/?cat=developpement">
            <h6>Développement</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>Technologie</h6>
          </Link>
          
          <span>{currentUser?.user.name}</span>
          {currentUser ? (
            <span onClick={handleLogout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};


export default Navbar
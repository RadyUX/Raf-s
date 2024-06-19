
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import authService from "../service/authService";
const Navbar = () => {
    
    const authContext = useContext(AuthContext);
   
    const {  logout } = authContext;
    const currentUser = authService.getCurrentUser();
    
    const handleLogout = () => {
        logout();
   
      };

      console.log(currentUser);
  return (
    
    <div className="navbar">
      
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
          
          <span>{currentUser?.user.user.name}</span>
          {currentUser ? (
            <span onClick={handleLogout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
       { currentUser?.decodedToken.isAdmin && currentUser?.decodedToken && (
            <span className="write">
              <Link className="link" to="/write">
                Write
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};


export default Navbar
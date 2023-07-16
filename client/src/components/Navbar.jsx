import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { authData, setAuthData } = useContext(AuthContext);

  const logoutUser = () => {
    setAuthData({
      userId: null,
      isAuth: false,
      authToken: null,
      expiresIn: new Date().getTime(),
    });
    localStorage.removeItem("authUser");
    navigate("/auth/login");
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h2>mY bL0g</h2>
        </Link>
      </div>
      {authData.isAuth ? (
        <ul className="navbar_items">
          <Link to="/">
            <li className="navbar_items_item">Feed</li>
          </Link>
          <Link to="/admin">
            <li className="navbar_items_item">Admin Area</li>
          </Link>
          <Link to="/admin/post/create">
            <li className="navbar_items_item">New Post</li>
          </Link>
          <li className="navbar_items_item nav_btn" onClick={logoutUser}>
            Logout
          </li>
        </ul>
      ) : (
        <ul className="navbar_items">
          <Link to="/">
            <li className="navbar_items_item">Feed</li>
          </Link>
          <Link to="/auth/signup">
            <li className="navbar_items_item">Sign Up</li>
          </Link>
          <Link to="/auth/login">
            <li className="navbar_items_item">Login</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};
export default Navbar;

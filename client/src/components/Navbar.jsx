import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h2>mY bL0g</h2>
        </Link>
      </div>
      {/* <ul className="navbar_items">
        <li className="navbar_items_item">Feed</li>
        <li className="navbar_items_item">Sign In</li>
      </ul> */}
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
        <Link to="/auth/logout">
          <li className="navbar_items_item">Logout</li>
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;

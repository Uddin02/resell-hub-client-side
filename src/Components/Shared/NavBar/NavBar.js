import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const NavBar = () => {
  
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const menuItems = <React.Fragment>
    <li className="font-semibold"><Link to="/">Home</Link></li>
    <li className="font-semibold"><Link to="/blog">Blog</Link></li>
    {user?.uid ?
        <>
            <li className="font-semibold"><Link to="/dashboard">Dashboard</Link></li>
            <li><p className="mx-auto font-bold"> {user?.displayName}</p></li>
            <li className="font-semibold"><button onClick={handleLogOut}><FaSignOutAlt/>Sign out</button></li>
        </>
        : <li className="font-semibold"><Link to="/login">Login</Link></li>}
  </React.Fragment>

  return (
    <div className="navbar bg-gray-100 flex justify-between">
      <div className="navbar-start">
          <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-200 rounded-box w-52">
                  {menuItems}
              </ul>
          </div>
          <Link to="/" className="text-primary ml-10 text-xl font-bold">Resell Hub</Link>
      </div>
      <div className="navbar-center hidden lg:flex mr-10">
          <ul className="menu menu-horizontal p-0">
              {menuItems}
          </ul>
      </div>
    <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
    </label>
  </div>
  );
};

export default NavBar;

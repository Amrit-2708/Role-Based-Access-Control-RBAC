/* eslint-disable react/prop-types */
import {useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {

  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("user"));

  const isAdmin = props.isAdmin;
  
  function handleLogOut() {
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="mx-auto max-w-8xl flex items-center justify-between p-6 lg:px-8 font-bold text-gray-100 bg-pink-800">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          VRV Security
        </a>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        <a href="/" className="text-sm/6 font-semibold">
          Home
        </a>
        {token && (<a href={`/change_password/${token}`} className="text-sm/6 font-semibold">
          Change Password
        </a>)}
        {token && isAdmin && (<a href={`/org/${token}`} className="text-sm/6 font-semibold">
          Manage Members
        </a>)}
        {token && !isAdmin && (<a href={`/org/${token}`} className="text-sm/6 font-semibold">
          Members
        </a>)}
        {token && (<button onClick={handleLogOut} className="text-sm/6 font-semibold">
          Log Out
        </button>)}
      </div>
    </nav>
  );
};

export default Navbar;

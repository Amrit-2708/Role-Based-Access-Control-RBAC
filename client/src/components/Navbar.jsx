/* eslint-disable react/prop-types */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("user"));
  const isAdmin = props.isAdmin;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      <div className="flex-col">
        <div className="sm:hidden flex justify-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {!isMenuOpen ? (
              <Bars3Icon className="h-6 w-6" />
            ) : (
              <XMarkIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`${isMenuOpen ? "flex flex-col items-center" : "hidden"
            } sm:flex sm:gap-x-6 md:flex md:gap-x-8 lg:flex lg:gap-x-12`}
        >
          <a href="/" className="text-sm/6 font-semibold py-2">
            Home
          </a>
          {token && (
            <a href={`/change_password/${token}`} className="text-sm/6 font-semibold py-2">
              Change Password
            </a>
          )}
          {token && isAdmin && (
            <a href={`/org/${token}`} className="text-sm/6 font-semibold py-2">
              Manage Members
            </a>
          )}
          {token && !isAdmin && (
            <a href={`/org/${token}`} className="text-sm/6 font-semibold py-2">
              Members
            </a>
          )}
          {token && (
            <button onClick={handleLogOut} className="text-sm/6 font-semibold py-2">
              Log Out
            </button>
          )}
        </div>

      </div>

      {/* Hamburger menu for smaller screens */}

    </nav>
  );
};

export default Navbar;
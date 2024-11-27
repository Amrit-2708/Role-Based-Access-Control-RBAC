import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isFormValid = email && password;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      navigate(`/org/${token}`);
    }
  });

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        toast.success(`${result.data.message}`, { autoClose: 2000 });
        localStorage.setItem("user", result.data.id);
        localStorage.setItem("role", result.data.role);
        setTimeout(() => {
          navigate(`/org/${result.data.id}`);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if(error.response)
        {
          toast.error(`${error.response.data.message}`, { autoclose: 5000 });
        }
        else if(!error.response){
          toast.error(`${error.message}. Please try again later`, { autoclose: 5000 })
        }
      });
  }

  return (
    <div className="w-full text-white bg-cyan-900 h-screen">
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-5xl mt-8 font-serif">Log In!</h1>
      </div>

      <div className="bg-yellow-400 flex my-16 mx-auto w-11/12 sm:w-11/12 md:w-1/2 lg:w-1/2 justify-center items-center border-8 rounded-md">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mt-8 block text-sm/6 font-medium text-gray-900">
              Email
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>

          <div className="mb-6">
            <label className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>

          <div className="mb-8">
            <button
              className={`block w-full h-10 px-6 font-semibold rounded-md border border-slate-200 text-white ${isFormValid ? "bg-black" : "bg-gray-500"
                }`}
            >
              Log In
            </button>
          </div>
          <div className="mb-8 flex justify-center">
            <p className="text-black">
              Not Joined Us Yet?<span className="mx-1"></span>
              <NavLink to="/signup" className="text-white">
                Sign Up !
              </NavLink>
            </p>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Login;

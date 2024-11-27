import { useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      navigate(`/org/${token}`);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("sab sahi hai");
    axios
      .post("http://localhost:3001/signup", { name, email, password })
      .then((result) => {
        toast.success(`${result.data.message}. Now Log In`)
        console.log("signup wale:", result);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          toast.error(`${error.response.data.message}. Please use another email id`, { autoclose: 5000 });
        }
        else if (!error.response) {
          toast.error(`${error.message}. Please try again later`, { autoclose: 5000 })
        }
      });
  }

  const isFormValid = name && email && password;

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-5xl mt-8 font-serif">Sign Up!</h1>
      </div>

      <div className="bg-yellow-400 flex my-8 justify-center border-4 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mt-8 mb-4">
            <label className="block text-sm/6 font-medium text-gray-900">
              Name
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              type="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="block text-sm/6 font-medium text-gray-900">
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

          <div className="mb-4">
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
              disabled={!isFormValid}
              type="submit"
              className={`block w-full h-10 px-6 font-semibold rounded-md border border-slate-200 text-white ${isFormValid ? "bg-black" : "bg-gray-500 cursor-not-allowed"
                }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-8 flex justify-center">
            <p>
              Already have an account?<span className="mx-1"></span>
              <NavLink to="/login" className="text-white">
                Log In !
              </NavLink>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

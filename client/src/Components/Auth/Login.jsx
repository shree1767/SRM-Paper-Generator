import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "../Main/Main.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);
  const { user, login } = useContext(UserContext);

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    await login(email, password);
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div className="mx-auto p-8 md:p-20 mt-12 h-[93vh] flex justify-center items-center bg-[#F6F6F6]">
      <div className="p-6 rounded-lg bg-white md:w-[40%] w-[95%] md:h-4/5 h-[70%] shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-3xl font-medium mb-6">Login</h2>
        <form
          onSubmit={(e) => {
            handleLogin(e, email, password);
          }}
          className="w-[70%] max-w-md"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-md font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-md font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center mt-5 justify-evenly">
            <button
              type="submit"
              className="bg-[#0C4DA1] text-white py-3 px-5 md:px-20 rounded"
            >
              Login
            </button>
          </div>
          <Link to="/signup" className="flex justify-evenly mt-5">
            <button className="text-[#0C4DA1]">Sign Up</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

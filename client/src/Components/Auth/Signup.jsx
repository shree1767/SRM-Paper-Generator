import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeID, setEmployeeID] = useState("");

  const { user, signup } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    await signup({
      name,
      email,
      password,
      department,
      designation,
      employeeID,
    });
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div className="mx-auto p-8 md:p-20 mt-12 h-[93vh] flex justify-center items-center bg-[#F6F6F6]">
      <div className="p-6 rounded-lg bg-white md:w-[40%] w-[95%] md:h-[110%] mt-10 shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-3xl font-medium">Sign Up</h2>
        <form onSubmit={(e) => handleSignUp(e)} className="w-[70%] max-w-md">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-md font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
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
              placeholder="Create a strong password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-gray-700 text-md font-medium mb-2"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your Department"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="designation"
              className="block text-gray-700 text-md font-medium mb-2"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter your Designation"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="employeeId"
              className="block text-gray-700 text-md font-medium mb-2"
            >
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              placeholder="Enter your Employee ID"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center mt-3 justify-evenly">
            <button
              type="submit"
              className="bg-[#0C4DA1] text-white py-3 px-5 md:px-20 rounded"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

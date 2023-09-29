import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Main.css";

const Landing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="mx-auto flex flex-col space-y-5 items-center p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]">
      <div>
        <Link to="/generator">
          <button className=" text-2xl bg-[#0C4DA1]  px-5 py-3  text-white rounded-xl font-light">
            Generate Paper
          </button>
        </Link>
      </div>
      <div>
        <Link to="/upload">
          <button className="text-2xl border border-[#0C4DA1] px-2 py-3 text-[#0C4DA1] rounded-xl font-light">
            Upload Questions
          </button>
        </Link>
      </div>
      {/* {user.role === "admin" && ( */}
        <>
          <div>
            <Link to="/questions">
              <button className="text-2xl border border-[#0C4DA1] px-2 py-3 text-[#0C4DA1] rounded-xl font-light">
                Manage Questions
              </button>
            </Link>
          </div>
          <div>
            <Link to="/professors">
              <button className="text-2xl border border-[#0C4DA1] px-2 py-3 text-[#0C4DA1] rounded-xl font-light">
                Manage Professors
              </button>
            </Link>
          </div>
          <div>
            <Link to="/coursecontrol">
              <button className="text-2xl border border-[#0C4DA1] px-5 py-3 text-[#0C4DA1] rounded-xl font-light">
                Manage Courses
              </button>
            </Link>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default Landing;

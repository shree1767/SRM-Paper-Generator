import React, { useState, useContext, useEffect } from "react";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteico from "./assets/delete-ico.svg";
import UserContext from "../../../context/UserContext";

const QuestionControl = () => {
  const [tableData, setTableData] = useState([]);
  const [tableSubData,setTableSubData] = useState([]);
  const { user, cookies } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/question/objective", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      const responseSub = await fetch(
        "http://localhost:8000/question/subjective",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch objectives.");
      }
      const dataSub = await responseSub.json();
      const data = await response.json();
      setTableData(data);
      setTableSubData(dataSub);
    } catch (error) {
      console.error("Error fetching objectives:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies.jwt]);

  const deleteObjective = async (id) => {
    try {
      //delete objective
      const response = await fetch(
        `http://localhost:8000/question/objective/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      console.log(await response.json());
      if (response.status === 201) {
        toast.success("Question deleted !", {
          position: "top-right",
          autoClose: 3000,
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const deleteSubjective = async (id) => {
    try {
      const responseSub = await fetch(
        `http://localhost:8000/question/subjective/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      console.log(await responseSub.json());
      if (responseSub.status === 201) {
        toast.success("Question deleted !", {
          position: "top-right",
          autoClose: 3000,
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="mx-auto flex flex-col space-y-5  p-8 md:px-20 mt-20 h-full w-screen justify-center bg-[#F6F6F6]">
      <div className="text-3xl font-semibold mx-auto mt-10 mb-5">
        All Questions
      </div>
      <div className="flex justify-center px-5">
        <table className="shadow border-collapse md:w-3/4">
          <thead className="bg-neutral-200">
            <tr className="font-semibold text-neutral-600">
              <td className="border px-4 py-2">QUESTION</td>
              <td className="border px-4 py-2">COURSE</td>
              <td className="border px-4 py-2">ADDED BY</td>
              <td className="border px-4 py-2">ACTIONS</td>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.question}</td>
                <td className="border px-4 py-2">{item.course.code}</td>
                <td className="border px-4 py-2">{item.addedBy.name}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="w-5 h-5"
                    onClick={() => deleteObjective(item._id)}
                  >
                    <img src={deleteico} />
                  </button>
                </td>
              </tr>
            ))}
            {tableSubData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.question}</td>
                <td className="border px-4 py-2">{item.course.code}</td>
                <td className="border px-4 py-2">{item.addedBy.name}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="w-5 h-5"
                    onClick={() => deleteSubjective(item._id)}
                  >
                    <img src={deleteico} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionControl;

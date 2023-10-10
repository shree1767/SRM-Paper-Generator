import React, { useState,useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../context/UserContext";

const QuestionControl = () => {
  const [tableData, setTableData] = useState([]);
  const { user, cookies } = useContext(UserContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/question/objective", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch objectives.");
        }

        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching objectives:", error);
      }
    };

    fetchData();
  }, [cookies.jwt]);

  console.log(tableData);

  const deleteObjective = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8000/question/objective/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      console.log(response.json())
      if(response.status === 201){
        alert('Course was successfully deleted')
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="mx-auto flex flex-col space-y-5 items-center p-8 md:p-20 mt-12 h-full justify-center bg-[#F6F6F6]">
      <div className="text-2xl font-semibold text-center">All Questions</div>
      <div>
        <table className="">
          <thead>
            <tr>
              <td className="border px-4 py-2">Question</td>
              <td className="border px-4 py-2">Course</td>
              <td className="border px-4 py-2">Added By</td>
              <td className="border px-4 py-2">Action</td>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item,index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.question}</td>
                <td className="border px-4 py-2">{item.course.code}</td>
                <td className="border px-4 py-2">{item.addedBy.name}</td>
                <td className="border px-4 py-2 text-center">
                  <button className="w-5 h-5" onClick={()=>deleteObjective(item._id)}>
                    <FontAwesomeIcon icon={faTrash} />
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

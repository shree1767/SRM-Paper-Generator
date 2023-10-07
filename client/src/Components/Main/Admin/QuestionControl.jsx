import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the delete icon


const QuestionControl = () => {
    
  // Sample table data 
  const tableData = [
    {
      question: "Sample Question 1",
      course: "Sample Course 1",
      addedBy: "John Doe",
    },
  ];

  return (
    <div className="mx-auto flex flex-col space-y-5 items-center p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]">
      <div>All Questions</div>
      <div>
        <table className="table-auto">
          <thead>
            <tr >
              <td className="border px-4 py-2">Question</td>
              <td className="border px-4 py-2">Course</td>
              <td className="border px-4 py-2">Added By</td>
              <td className="border px-4 py-2">Action</td>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.question}</td>
                <td className="border px-4 py-2">{item.course}</td>
                <td className="border px-4 py-2">{item.addedBy}</td>
                <td className="border px-4 py-2 text-center">
                  <button className="w-5 h-5">
                  <FontAwesomeIcon icon={faTrash}/>
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

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the delete icon


const UserControl = () => {
    
  // Sample table data 
  const tableData = [
    {
      name: "Sample Proffesor 1",
      department: "Sample Department 1",
      approved: "false",
    },
  ];

  return (
    <div className="mx-auto flex flex-col space-y-5 items-center p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]">
      <div>Manage Professors</div>
      <div>
        <table className="table-auto">
          <thead>
            <tr >
              <td className="border px-4 py-2">Professor Name</td>
              <td className="border px-4 py-2">Deparment</td>
              <td className="border px-4 py-2">Approved</td>
              <td className="border px-4 py-2">Action</td>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.department}</td>
                <td className="border px-4 py-2">{item.approved}</td>
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

export default UserControl;
import React from "react";
import deleteico from './assets/delete-ico.svg'

const UserControl = () => {
    
  // Sample table data 
  const tableData = [
    {
      name: "Sample Proffesor 1",
      department: "Sample Department 1",
      approved: "false",
    },
  ];

  const deleteUser = () => {}
  return (
    <div className="mx-auto flex flex-col space-y-5  p-8 md:px-20 mt-20 h-full w-screen justify-center bg-[#F6F6F6]">
      <div className="text-3xl font-semibold mx-auto mt-10 mb-5">Manage Professors</div>
      <div className="flex justify-center px-5">
        <table className="shadow border-collapse md:w-3/4">
          <thead className="bg-neutral-200">
            <tr className="font-semibold text-neutral-600">
              <td className="border px-4 py-2">Professor Name</td>
              <td className="border px-4 py-2">Deparment</td>
              <td className="border px-4 py-2">Approved</td>
              <td className="border px-4 py-2">Action</td>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.department}</td>
                <td className="border px-4 py-2">{item.approved}</td>
                <td className="border px-4 py-2 text-center">
                  <button className="w-5 h-5" onClick={() => deleteUser(item._id)}>
                    <img src={deleteico}/>
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
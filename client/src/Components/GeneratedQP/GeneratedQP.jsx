import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FaDownload, FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Template from "./Template";
import "./results.css";
const GeneratedQP = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Hide the Confetti after 2 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [editPaper, setEditPaper] = useState({
    year: "",
    set_type: "",
    set_number: "",
    date: "",
    duration: "",
    sem: "",
  });


  const handlePrint = () => {
    // Create a new window or iframe for printing
    const printWindow = window.open('', '', 'width=600,height=600');
    
    // Add the content you want to print to the new window or iframe
    printWindow.document.open();
    printWindow.document.write(
      <Template/>
    );
    printWindow.document.close();
    
    // Print the new window or iframe
    printWindow.print();
  };
  return (
    <div className=" mx-auto p-8 md:p-20 mt-12 h-full justify-center bg-[#F6F6F6]">
      <div className="">
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:items-center">
          <h1 className="text-2xl md:text-4xl font-medium mb-2 md:mb-4 mt-12 md:mt-5">
            Here is your Question paper
          </h1>
          <p className="text-sm md:text-xl text-[#0C4DA1] font-medium mb-2 md:mb-4 mt-5 md:mt-0">
            Edit Paper → Download as PDF
          </p>
        </div>
        <div className="flex space-x-10 mt-4 md:mt-0">
          <button
            className="flex items-center text-[#0C4DA1] hover:text-black"
          >
            <span className="mr-3">Edit Template</span>
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            className="flex items-center text-[#0C4DA1] hover:text-black"
            onClick={handlePrint}
          >
            <span className="mr-3">Print</span>
            <FaDownload className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* display generated question paper here */}
      <div id="report" className="md:flex md:justify-between w-[100vw]">
        <div className="my-10 bg-[#E4B315] p-5 shadow-xl h-1/2 rounded-md">
          <form className="space-y-5 font-semibold">
              <div className="flex space-x-2 items-center ">
                <label>Academic Year</label>
                <input
                type="text"
                  value={editPaper.year}
                  onChange={(e) =>
                    setEditPaper((prev) => ({ ...prev, year: e.target.value }))
                  }
                  className="border rounded p-2"
                  placeholder="2022-2023"
                />
              </div>
              <div className="flex space-x-2 items-center">
                <label>Set Type</label>
                <input
                type="text"
                  value={editPaper.set_type}
                  onChange={(e) =>
                    setEditPaper((prev) => ({ ...prev, set_type: e.target.value }))
                  }
                  className="border rounded p-2"
                  placeholder="ODD or EVEN"
                />
              </div>
              <div className="flex space-x-2 items-center">
                <label>Set Number</label>
                <input
                type="text"
                  value={editPaper.set_number}
                  onChange={(e) =>
                    setEditPaper((prev) => ({ ...prev, set_number: e.target.value }))
                  }
                  className="border rounded p-2"
                  placeholder="C"
                />
              </div>
              <div className="flex space-x-2 items-center">
                <label>Date</label>
                <input
                type="text"
                  value={editPaper.date}
                  onChange={(e) =>
                    setEditPaper((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="border rounded p-2"
                />
              </div>
              <div className="flex space-x-2 items-center">
                <label>Duration</label>
                <input
                type="text"
                  value={editPaper.duration}
                  onChange={(e) =>
                    setEditPaper((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  className="border rounded p-2"
                  placeholder="60mins"
                />
              </div>
              <div className="flex space-x-2 items-center">
                <label>Semester</label>
                <input
                type="text"
                  value={editPaper.sem}
                  onChange={(e) =>
                    setEditPaper((prev) => ({ ...prev, sem: e.target.value }))
                  }
                  className="border rounded p-2"
                />
              </div>
          </form>
        </div>

        <Template questions={location.state} year={editPaper.year} set_type={editPaper.set_type} set_number={editPaper.set_number} date={editPaper.date} duration={editPaper.duration} sem={editPaper.sem} />
      </div>
      {/* / */}
    </div>
  );
};

export default GeneratedQP;

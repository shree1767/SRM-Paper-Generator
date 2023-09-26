import React from "react";
import logo from "./assets/logo.svg";
import "./template.css";

const Template = ({ questions }) => {
  const { objective, subjectivie } = questions;

  return (
    <div className="page w-[210mm] shadow-lg h-[297mm] bg-white px-6 py-10 my-10 mx-auto justify-center items-center">
      <div className="page-content">
        <div className="flex justify-evenly text-[15px] space-x-5 px-20 items-center">
          <div>
            <img src={logo} className="" alt="srm-logo" />
          </div>
          <div className="text-center ">
            <h1 className="font-[600]">
              SRM Institute of Science and Technology
            </h1>
            <h1 className="font-[600]">
              College of Engineering and Technology
            </h1>
            <h2 className="font-[600]">DEPARTMENT OF CHEMISTRY</h2>
            <p>
              SRM Nagar,Kattankulathur-603203, Chengalpattu District, Tamil Nadu
            </p>
            <p>
              Academic Year: <span>2022-23 </span>
              <span className="font-[600]">(EVEN) </span>
              <span className="font-[600]">SET 2</span>
            </p>
          </div>
          <div className="border w-[15vw] text-center py-5">
            Mode of Exam <br /> <span className="font-[600]">OFFLINE</span>
          </div>
        </div>
        <hr className="pb-5 mt-10 mx-20" />
        <div className="flex justify-between font-[600] text-[15px] space-x-10 px-20">
          <div>
            <p>
              Test:<span className="font-[350]">CLAT3</span>
            </p>
            <p>
              Course Code & Title:{" "}
              <span className="font-[350]">
                18CYM101T ENVIRONMENTAL SCIENCE
              </span>
            </p>
            <p>
              Year & Sem: <span className="font-[350]">2022-23 EVEN</span>
            </p>
          </div>
          <div>
            <p>
              Date:<span className="font-[350]">28-04-2023</span>
            </p>
            <p>
              Duration:<span className="font-[350]">1 period</span>
            </p>
            <p>
              Max.Marks:<span className="font-[350]">25</span>
            </p>
          </div>
        </div>
        <hr className="py-5 mt-5 mx-20" />
        <div className="flex text-[13px] justify-between space-x-10 px-20">
          <table className="border">
            <thead>
              <tr>
                <td className="px-2 border text-center">QNo.</td>
                <td className="px-[8vw] text-center border">Question</td>
                <td className="px-5 border text-center">Marks</td>
                <td className="px-5 border text-center">BL</td>
                <td className="px-5 border text-center">CO</td>
                <td className="px-8 border text-center">PO</td>
              </tr>
            </thead>
            <tbody>
              {/* MCQ Question */}
              {objective.map(
                (
                  {
                    question,
                    options,
                    courseOutcome,
                    programOutcome,
                    bloomsLevel,
                  },
                  index,
                ) => (
                  <tr key={index}>
                    <td className="font-[600] text-center border">
                      {index + 1}
                    </td>
                    <td className="pl-3 border py-3">
                      <p className="font-[600] ">{question}</p>
                      <ol
                        style={{ listStyleType: "lower-alpha" }}
                        className="pl-3"
                      >
                        {options.map((option, index) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ol>
                    </td>
                    <td className=" text-center border">1</td>
                    <td className="text-center border">{bloomsLevel}</td>
                    <td className="text-center border">{courseOutcome}</td>
                    <td className="text-center border">{programOutcome}</td>
                  </tr>
                ),
              )}

              {/* Normal Question */}
              {/* <tr>
                <td className="font-[600] text-center border">6</td>
                <td className="font-[600] pl-3 border">
                  Explain about solid waste management.
                </td>
                <td className="text-center border">10</td>
                <td className="text-center border">1,2,3</td>
                <td className="text-center border">4,5</td>
                <td className="text-center border">1,2,3,4 and 9</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div className="pr-[15vw]">
          <p className="pl-20 py-10 text-[12px] font-[600]">
            Course Outcome (CO) and Bloom's level(BL) Coverage in Questions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template;

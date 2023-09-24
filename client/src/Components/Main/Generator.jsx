import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown-select";

import "./Main.css";

const Generator = () => {
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");
  const [examtype, setExamtype] = useState("ct1");
  const [markScheme, setMarkScheme] = useState({
    mcq: "",
    subjectiveMarks: {
      2: "",
      3: "",
    },
  });

  const semesterOptions = [
    { value: "1", label: "I" },
    { value: "2", label: "II" },
    { value: "3", label: "III" },
    { value: "4", label: "IV" },
    { value: "5", label: "V" },
    { value: "6", label: "VI" },
    { value: "7", label: "VII" },
    { value: "8", label: "VIII" },
  ];

  const examtypeOptions = [{ value: "ct1", label: "CT-1" }];

  const generatePaper = async () => {
    let response = await fetch(
      "http://localhost:8000/generate?courseCode={courseCode}&markScheme={markScheme}",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        courseCode: courseCode,
        markScheme: markScheme,
      }
    );
    response = await response.json();
  };

  return (
    <div className="mx-auto p-8 md:p-20 mt-20 h-[90vh] flex-col items-center justify-center bg-[#F6F6F6]">
      <h1 className="text-2xl md:text-4xl text-center font-medium mb-2 md:mb-4 mt-10 md:mt-0">
        Question Paper Generator
      </h1>
      <div className="mx-auto w-20 h-1 bg-[#0C4DA1] my-4 md:w-[5vw] md:h-[5px] md:my-8" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col space-y-3 md:w-[40%] mx-auto"
      >
        <label className="block font-medium">Course Code</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border rounded p-2"
          placeholder="ex.18PY3101J"
          required
        />
        <label className="block font-medium">Semester</label>
        <Dropdown
          options={semesterOptions}
          values={[semester]}
          onChange={(values) => setSemester(values[0])}
          className="bg-white py-2"
          required
        />
        <label className="block font-medium">Exam type</label>
        <Dropdown
          options={examtypeOptions}
          values={[examtype]}
          onChange={(values) => setExamtype(values[0])}
          className="bg-white py-2"
          required
        />
        <label className="block font-medium">Marking Scheme</label>
        <div className="flex md:space-x-5 md:space-y-0 justify-between">
          <div>
            <label className="font-regular text-sm pr-3">MCQs</label>
            <input
              type="number"
              value={markScheme.mcq}
              onChange={(e) =>
                setMarkScheme({ ...markScheme, mcq: parseInt(e.target.value) })
              }
              className="border rounded p-2 w-20"
              placeholder=""
              required
            />
          </div>
          <div>
            <label className="font-regular text-sm pr-3">2 Mark</label>
            <input
              type="number"
              value={markScheme.subjectiveMarks[2]}
              onChange={(e) =>
                setMarkScheme({
                  ...markScheme,
                  subjectiveMarks: {
                    ...markScheme.subjectiveMarks,
                    2: parseInt(e.target.value),
                  },
                })
              }
              className="border rounded p-2 w-20"
              placeholder=""
              required
            />
          </div>
          <div>
            <label className="font-regular text-sm pr-3">3 Mark</label>
            <input
              type="number"
              value={markScheme.subjectiveMarks[3]}
              onChange={(e) =>
                setMarkScheme({
                  ...markScheme,
                  subjectiveMarks: {
                    ...markScheme.subjectiveMarks,
                    3: parseInt(e.target.value),
                  },
                })
              }
              className="border rounded p-2 w-20"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            onClick={generatePaper}
            className="custom-button mt-5 hover:text-black py-3 px-8 md:px-16 "
          >
            <span className="button-text font-light">GENERATE</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Generator;

import React, { useContext, useState } from "react";
import "./Upload.css";
import UserContext from "../../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ObjectiveAdd = (courses) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [courseOutcome, setCourseOutcome] = useState("");
  const [unit, setUnit] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [programOutcome, setProgramOutcome] = useState("");
  const [bloomsLevel, setBloomsLevel] = useState("");
  const [picode, setPicode] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const handleOptionTextChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };
  const { user, cookies } = useContext(UserContext);

  const objectiveAdd = async () => {
    let response = await fetch("http://localhost:8000/question/objective", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        question: question,
        options: options,
        imageFile: imageFile,
        courseCode: courseCode,
        unit: unit,
        courseOutcome: courseOutcome,
        programOutcome: programOutcome,
        bloomsLevel: bloomsLevel,
        piCode: picode,
        user: user,
      }),
    });
    console.log(await response.json());
    if (response.status == 201) {
      toast.success("Objective added !", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };
  return (
    <div className="p-5 shadow my-5 bg-white w-full xl:w-1/2 flex flex-col justify-center">
      <ToastContainer />
      <div className="text-2xl my-5 font-semibold text-center">
        Objective Question
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="py-5 flex flex-col md:px-20"
      >
        <div className="flex flex-col space-y-5">
          <div className="flex space-x-5 items-center">
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              placeholder="What is chloroplast?..."
              className="border p-2 w-full "
            />
          </div>
          <div className="flex justify-between">
            <label>Options</label>
            <div className="flex flex-col space-y-3 w-4/5">
              {options.map((option, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionTextChange(index, e.target.value)
                    }
                    placeholder={`Add option ${index + 1}...`}
                    className="border p-2 w-full"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="upload-label">
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files)}
                accept="image/*"
                style={{ display: "none" }}
              />
              Upload Image
            </label>
          </div>
          <div className="flex items-center md:space-x-5">
            <label>Course Code</label>
            <select
              value={courseCode}
              onChange={(e) => {
                setCourseCode(e.target.value);
              }}
              className="border p-2 md:w-3/4 w-full"
              required
            >
              <option value="" disabled>
                Select a Course
              </option>
              {courses.courses.map((course) => (
                <option key={course.code} value={course.code}>
                 {course.code}- {course.title} 
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-regular text-sm pr-3">Unit</label>
            <input
              type="number"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border rounded p-2 w-20"
              placeholder=""
              required
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label className="font-regular text-sm pr-3">CO</label>
              <input
                type="number"
                value={courseOutcome}
                onChange={(e) => setCourseOutcome(e.target.value)}
                className="border rounded p-2 w-20"
                placeholder=""
                required
              />
            </div>
            <div>
              <label className="font-regular text-sm pr-3">PO</label>
              <input
                type="number"
                value={programOutcome}
                onChange={(e) => setProgramOutcome(e.target.value)}
                className="border rounded p-2 w-20"
                placeholder=""
                required
              />
            </div>
            <div>
              <label className="font-regular text-sm pr-3">BL</label>
              <input
                type="number"
                value={bloomsLevel}
                onChange={(e) => setBloomsLevel(e.target.value)}
                className="border rounded p-2 w-20"
                placeholder=""
                required
              />
            </div>
            <div>
              <label className="font-regular text-sm pr-3">PI CODE</label>
              <input
                type="number"
                value={picode}
                onChange={(e) => setPicode(e.target.value)}
                className="border rounded p-2 w-20"
                placeholder=""
                required
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              onClick={objectiveAdd}
              className="custom-button mt-5 hover:text-black py-3 px-8 md:px-16 "
            >
              <span className="button-text font-regular">ADD</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ObjectiveAdd;

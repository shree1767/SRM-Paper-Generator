import React, { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubjectiveAdd = () => {
  const [questionSub, setQuestionSub] = useState("");
  const [marksSub, setMarksSub] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [courseCodeSub, setCourseCodeSub] = useState("");
  const [unitSub, setUnit] = useState("");
  const [courseOutcomeSub, setCourseOutcome] = useState("");
  const [programOutcomeSub, setProgramOutcome] = useState("");
  const [bloomsLevelSub, setBloomsLevel] = useState("");
  const [piCodeSub, setPiCode] = useState("");

  const { user, cookies } = useContext(UserContext);

  const subjectiveAdd = async () => {
    let response = await fetch("http://localhost:8000/question/subjective", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        question: questionSub,
        marks: marksSub,
        imageFile: imageFile,
        courseCode: courseCodeSub,
        unit: unitSub,
        courseOutcome: courseOutcomeSub,
        programOutcome: programOutcomeSub,
        bloomsLevel: bloomsLevelSub,
        piCode: piCodeSub,
        user: user,
      }),
    });
    console.log(await response.json());
    if (response.status == 201) {
      toast.success("Subjective added !", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };
  return (
    <div className="p-5 shadow my-5 bg-white w-full xl:w-1/2">
      <div className="text-2xl my-5 font-semibold text-center">
        Subjective Question
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
              value={questionSub}
              onChange={(e) => {
                setQuestionSub(e.target.value);
              }}
              placeholder="What is chloroplast?..."
              className="border p-2 w-full "
            />
          </div>
          <div className="flex space-x-10 items-center">
            <label>Marks</label>
            <input
              type="number"
              value={marksSub}
              onChange={(e) => {
                setMarksSub(e.target.value);
              }}
              placeholder="Weightage"
              className="border p-2 w-full "
            />
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
          <div className="flex md:space-x-5 items-center">
            <label>Course Code</label>
            <input
              type="text"
              value={courseCodeSub}
              onChange={(e) => {
                setCourseCodeSub(e.target.value);
              }}
              placeholder="Course Code"
              className="border p-2 w-3/4"
            />
          </div>
          <div>
            <label className="font-regular text-sm pr-3">Unit</label>
            <input
              type="number"
              value={unitSub}
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
                value={courseOutcomeSub}
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
                value={programOutcomeSub}
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
                value={bloomsLevelSub}
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
                value={piCodeSub}
                onChange={(e) => setPiCode(e.target.value)}
                className="border rounded p-2 w-20"
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              onClick={subjectiveAdd}
              className="custom-button mt-5 hover:text-black py-3 px-8 md:px-16"
            >
              <span className="button-text font-regular">ADD</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubjectiveAdd;

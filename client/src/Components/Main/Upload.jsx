import React, { useState } from "react";

const Upload = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Initialize options as an array
  const [answer, setAnswer] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const [questionSub, setQuestionSub] = useState("");
  const [answerSub, setAnswerSub] = useState("");
  const [marksSub, setMarksSub] = useState("");
  const [departmentSub, setDeparmentSub] = useState("");
  const [courseCodeSub, setCourseCodeSub] = useState("");

  const objectiveAdd = async() => {
      let response = await fetch(
        "http://localhost:8000/objective",
        {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            question:question,
            options:options,
            answer:answer,
            courseCode:courseCode
          })
        },
      );
      const data = await response.json();

      if(response.status === 200){}
      
  };
  const subjectiveAdd = () => {};

  return (
    <div className="mx-auto p-8 md:p-20 mt-8 h-full flex-col bg-[#F6F6F6]">
       <h1 className="text-2xl md:text-4xl text-center font-medium mb-2 mt-5 md:mt-0">
        Add Questions
      </h1>
      <div className="mx-auto w-20 h-1 bg-[#0C4DA1] my-2 md:w-[5vw] md:h-[5px] md:my-5" />
      <div className="grid md:grid-cols-2 md:space-x-5 grid-cols-1">
        {/* objective add */}
        <div className="p-5 shadow my-5 bg-white">
          <div className="text-xl font-semibold text-center">
            Objective Question
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="py-5"
          >
            <div className="flex flex-col space-y-5">
              <div className="flex space-x-5 items-center justify-between">
                <label>Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  placeholder="What is chloroplast?..."
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-between">
                <label>Options</label>
                <div className="flex flex-col space-y-3 md:w-[35.5vw] w-[57vw]">
                  {options.map((option, index) => (
                    <input
                      type="text"
                      key={index}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      placeholder={`Add option ${index + 1}...`}
                      className="border p-2 w-full"
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-8 items-center justify-between">
                <label>Answer</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                  placeholder="Correct answer"
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex space-x-1 items-center justify-between">
                <label>Course Code</label>
                <input
                  type="text"
                  value={courseCode}
                  onChange={(e) => {
                    setCourseCode(e.target.value);
                  }}
                  placeholder="Course Code"
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  onClick={objectiveAdd}
                  className="custom-button mt-5 hover:text-black py-3 px-8 md:px-16 "
                >
                  <span className="button-text font-light">ADD</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* subjective add */}
        <div className="p-5 shadow my-5 bg-white">
          <div className="text-xl font-semibold text-center">
            Subjective Question
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="py-5"
          >
            <div className="flex flex-col space-y-5">
              <div className="flex space-x-5 items-center justify-between">
                <label>Question</label>
                <input
                  type="text"
                  value={questionSub}
                  onChange={(e) => {
                    setQuestionSub(e.target.value);
                  }}
                  placeholder="What is chloroplast?..."
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex space-x-10 items-center justify-between">
                <label>Marks</label>
                <input
                  type="text"
                  value={marksSub}
                  onChange={(e) => {
                    setMarksSub(e.target.value);
                  }}
                  placeholder="Correct answer"
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex space-x-1 items-center justify-between">
                <label>Course Code</label>
                <input
                  type="text"
                  value={courseCodeSub}
                  onChange={(e) => {
                    setCourseCodeSub(e.target.value);
                  }}
                  placeholder="Course Code"
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  onClick={subjectiveAdd}
                  className="custom-button mt-5 hover:text-black py-3 px-8 md:px-16 "
                >
                  <span className="button-text font-light">ADD</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;

import React, { useState } from 'react';
import Dropdown from 'react-dropdown-select';
import './Main.css'
const Main = () => {
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [dateOfExam, setDateOfExam] = useState('');
  const [markingScheme, setMarkingScheme] = useState('');

  const markingSchemeOptions = [
    { value: 'scheme1', label: 'Scheme 1' },
    { value: 'scheme2', label: 'Scheme 2' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
  };

  return (
    <div className="mx-auto p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]">
      <h1 className="text-2xl md:text-4xl text-center font-medium mb-2 md:mb-4 mt-10 md:mt-0">Question Paper Generator</h1>
      <div className="mx-auto w-20 h-1 bg-[#0C4DA1] my-4 md:w-[5vw] md:h-[5px] md:my-8" />

      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-3 md:w-2/3 lg:w-1/2 mx-auto">
        <label className="block font-medium">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded p-2"
          placeholder="DSBS"
        />

        <label className="block font-medium">Year</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded p-2"
          placeholder="2022-2023"
        />

        <label className="block font-medium">Course Code/Subject</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border rounded p-2"
          placeholder="18PY3101J-OOPS"
        />

        <label className="block font-medium">Date of Exam</label>
        <input
          type="date"
          value={dateOfExam}
          onChange={(e) => setDateOfExam(e.target.value)}
          className="border rounded p-2 my-2"
        />

        <label className="block font-medium">Marking Scheme</label>
        <Dropdown
          options={markingSchemeOptions}
          values={[markingScheme]}
          onChange={(values) => setMarkingScheme(values[0])}
          className="bg-white py-2"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="custom-button  mt-5  hover:text-black py-3 px-8 md:px-16"
          >
            <span class="button-text">GENERATE</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Main;


import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Dropdown from 'react-dropdown-select';
import './Main.css'

const Next = () => {
    const [semester, setSemester] = useState('');
    const [examtype, setExamtype] = useState('ct1');
    const [markingScheme, setMarkingScheme] = useState('scheme1');

    const markingSchemeOptions = [
        { value: 'scheme1', label: '5x(1 mark), 2x(10 mark)' },
      ];

    const semesterOptions = [
        { value: '1', label: 'I' },
        { value: '2', label: 'II' },
        { value: '3', label: 'III' },
        { value: '4', label: 'IV' },
        { value: '5', label: 'V' },
        { value: '6', label: 'VI' },
        { value: '7', label: 'VII' },
        { value: '8', label: 'VIII' },
    ];
    const examtypeOptions = [
        { value: 'ct1', label: 'CT-1' },
    ];

      
   const handleFormSubmit =(e)=>{
        e.preventDefault();
   }

  return (
    <div className="mx-auto p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]">
      <h1 className="text-2xl md:text-4xl text-center font-medium mb-2 md:mb-4 mt-10 md:mt-0">
        Question Paper Generator
      </h1>
      <div className="mx-auto w-20 h-1 bg-[#0C4DA1] my-4 md:w-[5vw] md:h-[5px] md:my-8" />
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-3 md:w-2/3 lg:w-1/2 mx-auto"
      >
        <label className="block font-medium">Semester</label>
        <Dropdown
          options={semesterOptions}
          values={[semester]}
          onChange={(values) => setSemester(values[0])}
          className="bg-white py-2"
        />

      

        <label className="block font-medium">Exam type</label>
        <Dropdown
          options={examtypeOptions}
          values={[examtype]}
          onChange={(values) => setExamtype(values[0])}
          className="bg-white py-2"
        />      

        <label className="block font-medium">Marking Scheme</label>
        <Dropdown
          options={markingSchemeOptions}
          values={[markingScheme]}
          onChange={(values) => setMarkingScheme(values[0])}
          className="bg-white py-2"
        />

        <div className="flex justify-center">
          <Link
            to="/generated"
            className="custom-button mt-5 hover:text-black py-3 px-8 md:px-16"
          >
            <span className="button-text">GENERATE</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Next
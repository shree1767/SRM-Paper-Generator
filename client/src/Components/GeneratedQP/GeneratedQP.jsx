import React,{useState,useEffect} from 'react';
import { FaDownload,FaEdit } from 'react-icons/fa';
import Confetti from 'react-confetti';

const GeneratedQP = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 3000); 

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleDownload = ()=>{}

  return (
    <div className="mx-auto p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]">
      {/* {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} */}
      {/* header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:items-center">
          <h1 className="text-2xl md:text-4xl font-medium mb-2 md:mb-4 mt-12 md:mt-5">
            Here is your Question paper
          </h1>
          <p className="text-sm md:text-lg text-[#0C4DA1] font-regular mb-2 md:mb-4 mt-5 md:mt-0">
            The results have been generated successfully
          </p>
        </div>
        <div className="flex space-x-10 mt-4 md:mt-0">
          <button className="flex items-center text-[#0C4DA1] hover:text-black" onClick={handleDownload}>
            <span className="mr-3">Edit Template</span>
            <FaEdit className='w-5 h-5'/>
          </button>
           <button className="flex items-center text-[#0C4DA1] hover:text-black" onClick={handleDownload}>
            <span className="mr-3">Print</span>
            <FaDownload className='w-5 h-5'/>
          </button>
        </div>
      </div>
      {/* display generated question paper here */}
      <div>
          
      </div>
      {/* / */}
    </div>
  );
};

export default GeneratedQP;

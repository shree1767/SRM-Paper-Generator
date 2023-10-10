import React, { useState } from "react";
import ObjectiveAdd from './ObjectiveAdd';
import SubjectiveAdd from './SubjectiveAdd';

const Upload = () => {
  const [activeTab, setActiveTab] = useState('objective');
  
  return (
    <div className="mx-auto p-8 md:p-20 md:mt-12 mt-20 h-full justify-center bg-[#F6F6F6]">
      <div className="flex">
        <button
          className={`px-4 py-2 rounded-l ${
            activeTab === 'objective' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setActiveTab('objective')}
        >
          Objective
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            activeTab === 'subjective' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setActiveTab('subjective')}
        >
          Subjective
        </button>
      </div>
      <div className="mt-4 ">
        {activeTab === 'objective' && <ObjectiveAdd />}
        {activeTab === 'subjective' && <SubjectiveAdd />}
      </div>
    </div>
  );
};

export default Upload;

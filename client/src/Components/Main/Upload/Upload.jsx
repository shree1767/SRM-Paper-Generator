import React, { useState,useContext,useEffect } from "react";
import ObjectiveAdd from './ObjectiveAdd';
import SubjectiveAdd from './SubjectiveAdd';
import UserContext from "../../../context/UserContext";

const Upload = () => {
  const { user, cookies } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('objective');
  const [courses,setCourses] = useState([])
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/course/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch courses.");
      }
  
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [cookies.jwt]);

  return (
    <div className="mx-auto p-8 md:p-20 md:mt-12 mt-20 h-full justify-center bg-[#F6F6F6]">
    
      <div className="flex">
        <button
          className={`px-4 py-2 rounded-l ${
            activeTab === 'objective' ? 'bg-[#0C4DA1] text-white' : 'bg-gray-300'
          }`}
          onClick={() => setActiveTab('objective')}
        >
          OBJECTIVE
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            activeTab === 'subjective' ? 'bg-[#0C4DA1] text-white' : 'bg-gray-300'
          }`}
          onClick={() => setActiveTab('subjective')}
        >
          SUBJECTIVE
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        {activeTab === 'objective' && <ObjectiveAdd courses = {courses}/>}
        {activeTab === 'subjective' && <SubjectiveAdd courses = {courses}/>}
      </div>
    </div>
  );
};

export default Upload;

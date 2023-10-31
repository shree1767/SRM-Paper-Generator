import React, { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../../../context/UserContext";
import deleteico from './assets/delete-ico.svg'

const CourseControl = () => {
  const { user, cookies } = useContext(UserContext);
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [imageFile, setImageFile] = useState("");

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewCourse = async () => {
    try {
      const response = await fetch("http://localhost:8000/course/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
        body: JSON.stringify({
          code: newCourseCode,
          title: newCourseTitle,
          imageFile: imageFile,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        closeModal();
        toast.success('Course added !', {
          autoClose: 2000, 
          position: "top-center",
        });
        
        fetchData(); 
      }
    } catch (err) {
      console.error("Error adding new course: ", err);
    }
  };

  const handleDelete = async (code) => {
    try {
      const response = await fetch(`http://localhost:8000/course/${code}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
  
      if (response.status === 201) {
        const responseData = await response.json();
        console.log(responseData);

        toast.success('Course deleted!', {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        console.error("Error deleting course:", response.status);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  
  return (
    <div className="mx-auto flex flex-col space-y-5  p-8 md:px-20 mt-20 h-full w-screen justify-center bg-[#F6F6F6]">
      <ToastContainer />
      <div className="flex justify-between mx-[12vw] items-center ">
      <h1 className="text-3xl font-semibold mt-10 mb-5">
        Course Control
      </h1>
      <button
        className="text-[#0C4DA1] border border-[#0C4DA1] py-1.5 px-3 rounded-xl"
        onClick={openModal}
      >
        ADD
      </button>
      </div>
      <div className="flex justify-center px-5">
      <table className="shadow border-collapse md:w-3/4">
        <thead className="bg-neutral-200">
          <tr className="font-semibold text-neutral-600">
            <th className="border p-2">Course Title</th>
            <th className="border p-2">Course Code</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {courses.map((course) => (
            <tr key={course._id}>
              <td className="border p-2">{course.title}</td>
              <td className="border p-2">{course.code}</td>
              <td className="border p-2 text-center ">
                <button className="w-5 h-5" onClick={() => handleDelete(course.code)}>
                  <img src={deleteico}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg md:w-[30vw]">
            <h2 className="text-xl font-semibold my-4">Add New Course</h2>
            <div className="mb-4">
              <label className="block mb-2">Code:</label>
              <input
                type="text"
                value={newCourseCode}
                onChange={(e) => setNewCourseCode(e.target.value)}
                className="border border-gray-400 p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Title:</label>
              <input
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                className="border border-gray-400 p-2 w-full"
              />
            </div>
            <div className="mb-4">
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
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleNewCourse}
              >
                Add Course
              </button>
              <button
                className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseControl;

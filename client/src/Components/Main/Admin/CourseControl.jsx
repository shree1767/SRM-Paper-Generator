import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CourseControl = () => {
  const { user, cookies } = useContext(UserContext);
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
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
      
      if(response.status === 201){
        alert('Course was successfully deleted')
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="mx-auto flex flex-col space-y-5 items-center p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]">
      <h1 className="text-2xl my-5 font-semibold text-center">
        Course Control
      </h1>
      <table className="border-collapse md:w-1/2">
        <thead>
          <tr>
            <th className="border p-2">Course Title</th>
            <th className="border p-2">Course Code</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td className="border p-2">{course.title}</td>
              <td className="border p-2">{course.code}</td>
              <td className="border p-2 text-center ">
                <button className="w-5 h-5" onClick={() => handleDelete(course.code)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="text-white bg-black rounded-full p-2"
        onClick={openModal}
      >
        New Course
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
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

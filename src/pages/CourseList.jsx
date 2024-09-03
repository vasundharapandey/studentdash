import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firestore instance

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = [];
        querySnapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() });
        });
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Course Listing</h1>
      <input
        type="text"
        placeholder="Search by course name or instructor"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div style={{ maxHeight: "300px", overflowY: "scroll", marginTop: "20px" }}>
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course)}
            style={{ padding: "10px", borderBottom: "1px solid #ccc", cursor: "pointer" }}
          >
            <h2>{course.name}</h2>
            <p>{course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase";

// function Courses() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "courses"));
//         const coursesData = [];
//         querySnapshot.forEach((doc) => {
//           coursesData.push({ id: doc.id, ...doc.data() });
//         });
//         setCourses(coursesData);
//       } catch (error) {
//         console.error("Error fetching courses: ", error);
//       }
//     };

//     fetchCourses();
//   }, []);

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import app from "../firebase"
// import addCourse from "../models/courseModel";
import { getDatabase,ref,get } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, addToCart,removeFromCart } from "../store/CartReducer";
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
 // const courses = useSelector(state => state.cart.courses);
const fetchCourses = async () => {
        const db = await getDatabase(app);
        const dbRef = await ref(db, "courses");
        const snapshot = await get(dbRef);
        if(snapshot.exists()) {
          setCourses(Object.values(snapshot.val()));
        //  dispatch(setCourses(Object.values(snapshot.val())));
        } else {
          alert("error");
        }
      }

useEffect(() => {
  //addCourse(); 
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

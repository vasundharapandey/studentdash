import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, off } from "firebase/database";
import app from "../firebase";
import Topbar from "../components/topbar";
import { FcLike } from "react-icons/fc";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "courses");


    const listener = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        setCourses(data); 
      } else {
        alert("Error fetching courses");
      }
    });


    return () => {
      off(dbRef, "value", listener); 
    };
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
      <Topbar />
      <div className="min-h-[88vh] bg-[#333333] py-12 text-white px-24 ">
        <div className="h-full w-full p-4">
          <div className="w-full flex gap-4 text-3xl">
            <div className="rounded-full bg-black p-3 h-16 w-16 flex items-center justify-center font-bold">VP</div>
            <div className="flex items-center justify-center font-semibold">
              <p>Welcome back, Vasundhara Pandey</p>
            </div>
          </div>
        </div>
        <div className="h-full w-full p-6">
          <div className="p-2">
            <h1 className="text-3xl font-bold">Course Listings</h1>
          </div>
          <div className="w-full p-2">
            <input
              type="text"
              placeholder="Search by course name or instructor"
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 rounded-xl bg-inherit border md:w-[50%] w-full"
            />
          </div>
        </div>
        <div className="px-6 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="p-4 rounded-xl bg-[#222222]"
            >
              <img src={course.thumbnail} className="h-60 rounded-xl w-full object-cover"/>
              <div className="flex justify-between">
                <div className="p-2">
                  <h2 className="text-xl font-bold py-2">{course.name}</h2>
                  <p className="text-[#888888]">By {course.instructor}</p>
                  <span>
                    <p className="text-[#888888] flex items-center">
                      <FcLike className="mr-2" />
                      {course.likes}
                    </p>
                  </span>
                </div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;

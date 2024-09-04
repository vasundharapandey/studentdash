import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";

const CourseDetails = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);
  const [showSyllabus, setShowSyllabus] = useState(false);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "courses");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const myData = snapshot.val();
      const course = Object.keys(myData)
        .map(myFireId => ({
          ...myData[myFireId],
          firebaseId: myFireId 
        }))
        .find(course => course.id === Number(id)); 

      if (course) {
        setCourse(course);
      } else {
        console.log("Course not found");
      }
    } else {
      console.log("Error fetching courses");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Enrollment Status:</strong> {course.enrollmentStatus}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Schedule:</strong> {course.schedule}</p>
      <p><strong>Location:</strong> {course.location}</p>
      <p><strong>Pre-requisites:</strong> {course.prerequisites.join(', ')}</p>
      <div>
        <h3 onClick={() => setShowSyllabus(!showSyllabus)} style={{ cursor: "pointer" }}>
          Syllabus {showSyllabus ? "-" : "+"}
        </h3>
        {showSyllabus && (
          <ul>
            {course.syllabus.map((item, index) => (
              <li key={index}>{item.topic}: {item.content}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;

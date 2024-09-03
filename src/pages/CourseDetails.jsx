import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch courses from the local JSON file
    fetch("./courses.js")
      .then((response) => response.json())
      .then((data) => {
        const foundCourse = data.find((course) => course.id === parseInt(id));
        setCourse(foundCourse);
        console.log(course);
      })
      .catch((error) => {
        console.error("There was an error fetching the course details!", error);
      });
  }, [id]); // Depend on id to refetch if it changes

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
      <p><strong>Pre-requisites:</strong> {course.prerequisites}</p>
      <div>
        <h3 onClick={() => setShowSyllabus(!showSyllabus)} style={{ cursor: "pointer" }}>
          Syllabus {showSyllabus ? "-" : "+"}
        </h3>
        {showSyllabus && (
          <ul>
            {course.syllabus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;

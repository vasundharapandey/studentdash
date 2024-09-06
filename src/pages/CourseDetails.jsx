import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, addToCart,removeFromCart } from "../store/CartReducer";
import Topbar from "../components/topbar";

const CourseDetails = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [enstatus, setEnstatus] = useState("Enroll")
  const dispatch=useDispatch();
  const navigate=useNavigate();
  //const [selectedProduct, setSelectedProduct] = useState(null);
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
  const handleCart=()=>{
    navigate('/dash');
    }
  const handleAddToCart = () => {
    if (course) {
// console.log("course to hAI");
 console.log(course);
      dispatch(addToCart(course));
    }
    setEnstatus("Enrolled")
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Topbar />
      <div className="min-h-[88vh] bg-[#333333] py-12 text-white px-24 ">
      <div className="h-full w-full p-4">
          <div className="w-full flex gap-4 text-3xl">
            <div className="flex items-center justify-center font-bold"><h1>{course.name}</h1></div>
          </div>
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between w-full">
          <div className="w-full">
            <img src={course.thumbnail} className="h-60 rounded-xl w-full object-cover md:h-96"/>
          </div>
          <div className="md:px-8 flex flex-col items-start text-lg">
          <p className="text-[#bbbbbb]"><strong className="text-white">Instructor :</strong> {course.instructor}</p>
      <p className="text-[#bbbbbb]"><strong className="text-white">Description :</strong> {course.description}</p>
      <p className="text-[#bbbbbb]"><strong className="text-white">Enrollment Status :</strong> {course.enrollmentStatus}</p>
      <p className="text-[#bbbbbb]"><strong className="text-white">Duration :</strong> {course.duration}</p>
      <p className="text-[#bbbbbb]"><strong className="text-white">Schedule :</strong> {course.schedule}</p>
      <p className="text-[#bbbbbb]"><strong className="text-white">Location :</strong> {course.location}</p>
      <p className="text-[#bbbbbb]"><strong className="text-white">Pre-requisites :</strong> {course.prerequisites.join(', ')}</p>
      <div className="my-4">
        <h3 onClick={() => setShowSyllabus(!showSyllabus)} className="cursor-pointer p-2 text-center my-2 rounded-lg w-48 bg-blue-500">
          {showSyllabus ? "Hide":"View"} Syllabus
        </h3>
        {showSyllabus && (
          <ul className="rounded-xl bg-[#222222] p-4">
            {course.syllabus.map((item, index) => (
              <li key={index}>{item.topic}: {item.content}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-4">
      <button onClick={handleAddToCart} className="p-2 rounded-lg bg-green-500 w-48">{enstatus}</button>
      <button onClick={handleCart} className="p-2 rounded-lg bg-green-500 w-48">View enrolled course</button>
      </div>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;

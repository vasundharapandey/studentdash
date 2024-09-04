import { collection, addDoc } from "firebase/firestore";
import app from "../firebase"
import { getDatabase,ref,set,push } from "firebase/database";

const addCourse=async()=> {
  const db=await getDatabase(app);
    const newDocRef =await push(ref(db, "courses"));
 await set(newDocRef, {
  "id": 5,
  "name": "Machine Learning Fundamentals",
  "instructor": "Dr. Sarah Lee",
  "description": "Understand the fundamentals of machine learning and build your first models.",
  "enrollmentStatus": "In Progress",
  "thumbnail": "ml_fundamentals_thumbnail.jpg",
  "duration": "10 weeks",
  "schedule": "Tuesdays and Thursdays, 4:00 PM-6:00 PM",
  "location": "Online",
  "prerequisites": ["Basic programming knowledge", "Basic linear algebra and calculus"],
  "syllabus": [
    {
      "week": 1,
      "topic": "Introduction to Machine Learning",
      "content": "Overview of machine learning concepts and algorithms."
    },
    {
      "week": 2,
      "topic": "Data Preprocessing",
      "content": "Techniques for preparing data for machine learning models."
    }
  ],
  "students": [
    {
      "id": 501,
      "name": "Isabel King",
      "email": "isabel@example.com"
    },
    {
      "id": 502,
      "name": "Jack Wilson",
      "email": "jack@example.com"
    }
  ]
}
).then( () => {
          alert("data saved successfully")
          console.log("Course added with ID: ", docRef.id);
        }).catch((error) => {
          alert("error: ", error.message);
        });
      }

export default addCourse;



import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have a firebase.js file with the Firebase initialization

async function addCourse() {
  try {
    const docRef = await addDoc(collection(db, "courses"), {
      id: 1, // Unique identifier for the course
      name: "Introduction to React Native",
      instructor: "John Doe", // Name of the course instructor
      description: "Learn the basics of React Native development and build your first mobile app.",
      enrollmentStatus: "Open", // Can be 'Open', 'Closed', or 'In Progress'
      thumbnail: "your.image.here", // Link to the course thumbnail
      duration: "8 weeks", // Duration of the course
      schedule: "Tuesdays and Thursdays, 6:00 PM-8:00 PM",
      location: "Online",
      prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
      syllabus: [
        {
          week: 1,
          topic: "Introduction to React Native",
          content: "Overview of React Native, setting up your development environment.",
        },
        {
          week: 2,
          topic: "Building Your First App",
          content: "Creating a simple mobile app using React Native components.",
        },
        // Additional weeks and topics...
      ],
      students: [
        {
          id: 101,
          name: "Alice Johnson",
          email: "alice@example.com",
        },
        {
          id: 102,
          name: "Bob Smith",
          email: "bob@example.com",
        },
        // Additional enrolled students...
      ],
    });

    console.log("Course added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding course: ", e);
  }
}

addCourse();
export default db;
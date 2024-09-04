import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/CartReducer';

function StudentDashboard() {
  const cart = useSelector(state => state.cart.cart); 
  const dispatch = useDispatch();
  //console.log(cart)

  const handleRemoveFromCart = (id) => {
   // console.log(cart)
   console.log(id)
    dispatch(removeFromCart(id)); 
    
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <h3>Your Enrolled Courses:</h3>
          <ul>
            {cart.map((course) => (
              <li key={course.firebaseId} style={{ marginBottom: '20px' }}>
                <h4>{course.name}</h4>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Schedule:</strong> {course.schedule}</p>
                <button onClick={() => handleRemoveFromCart(course.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;

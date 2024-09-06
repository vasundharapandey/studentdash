import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/CartReducer';
import Topbar from '../components/topbar';

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
      <Topbar />
      <div className="min-h-[88vh] bg-[#333333] py-12 text-white px-24 ">
      <div className="h-full w-full p-4">
          <div className="w-full flex gap-4 text-3xl">
            <div className="flex items-center justify-center font-bold"><h1>Student Dashboard</h1></div>
          </div>
      </div>
      <div className='py-4 px-6'>
      {cart.length === 0 ? (
        <div className='h-[40vh] w-full flex items-center justify-center'>
          <p>No enrolled courses</p>
        </div>
      ) : (
        <div>
          <h3 className='text-2xl font-semibold'>Your Enrolled Courses:</h3>
          <div className='md:mx-4 my-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8'>
            {cart.map((course) => (
              <div key={course.firebaseId} className="p-4 rounded-xl bg-[#222222]">
                <img className="h-60 border rounded-xl w-full"/>
                <h4 className='text-xl font-bold my-2'>{course.name}</h4>
                <div className='flex justify-between'>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                </div>
                <p className='my-2'><strong>Schedule:</strong> {course.schedule}</p>
                <button onClick={() => handleRemoveFromCart(course.id)} className="w-full rounded-lg bg-red-600 p-1 text-lg">Remove</button>
              </div>
            ))}
          </div>
        </div>
      )} 
      </div>
      </div>
      
    </div>
  );
}


{/* <h2>Student Dashboard</h2>
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
      )} */}

export default StudentDashboard;

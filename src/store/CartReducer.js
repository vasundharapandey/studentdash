import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"
const initialState = {
    courses: [],
    cart: [],
  };
export const cartSlice = createSlice({
    name:"cart",
  initialState,
    reducers:{
        setCourses: (state, action) => {
            state.courses = action.payload;
          },
          addToCart: (state, action) => {
        //     const product = state.cart.find(p => p.id === action.payload.id);
        //    if(product)
        //       state.cart.push({ ...action.payload, quantity: 1 });
        const course = action.payload
        const index = state.cart.findIndex((item) => item.id === course.id)
  
        if (index >= 0) {
          
          toast.error("Course already in cart")
          return
        }
        state.cart.push(course)
          },
          removeFromCart: (state, action) => {
            console.log(action.payload)
            state.cart = state.cart.filter(item => item.id !== action.payload);
          },
          
      
}
});


export const {setCourses,addToCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
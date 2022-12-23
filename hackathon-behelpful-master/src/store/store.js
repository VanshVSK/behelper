import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';


 const auth = createSlice({
  name: 'auth',
  initialState: {isloggedin:false,userdata:{}},
    reducers: {
    login: (state, action) => {
       state.isloggedin=true
       state.userdata=action.payload
  },
  logout:(state,action)=>{
      state.isloggedin=false
      state.userdata={}
  }
}})
const actions=auth.actions
export { actions}
export default  configureStore({
  reducer: auth.reducer,
})
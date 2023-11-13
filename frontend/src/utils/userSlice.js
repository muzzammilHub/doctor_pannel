import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState:{
        doctor:null
    },
    reducers:{
        addUser: (state, action)=>{
            state.doctor = action.payload
        },
        removeUser: (state, action)=>{
            state.doctor = null
        },
        loadUserSuccess:(state, action)=>{
            state.doctor = action.payload
        }
    }
})

export const {addUser, removeUser, loadUserSuccess} = userSlice.actions

export default userSlice.reducer
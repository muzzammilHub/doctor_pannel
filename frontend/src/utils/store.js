import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import patientSlice from "./patientSlice";

const store = configureStore({
    reducer: {
        user:userSlice,
        patient: patientSlice,
    }
})

export default store
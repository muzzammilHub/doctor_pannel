import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
    name: 'patient',
    initialState:{
        patient:null,
        isSend:false,
        medicalhistory: {}
    },
    reducers:{
        addPatient: (state, action)=>{
            state.action = action.payload
        },
        removePatient: (state, action)=>{
            state.patient = null
        },
        isPrescriptionSend: (state, action)=>{
            state.isSend = action.payload
        },
        patientmedicalinfo: (state, action)=>{
            state.medicalhistory = action.payload;
        }
    }
})


export const {addPatient, removePatient, isPrescriptionSend, patientmedicalinfo} = patientSlice.actions

export default patientSlice.reducer
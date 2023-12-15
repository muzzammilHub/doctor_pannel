import { addPatient, patientmedicalinfo } from "../utils/patientSlice"
import axios from 'axios'

export const loadPatient = ()=> async(dispatch)=>{
    try {
        const {data} = await axios.get('/api/v1/allPatient',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })

        dispatch(addPatient(data.filteredData))
    } catch (error) {
        console.error(error)
    }
}

export const loadMedicalInfo = (id)=> async(dispatch)=>{
    try {
        const {data} = await axios.get(`/api/v1/getHistory?id=${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        // console.log('********medicalHistory',data);
        dispatch(patientmedicalinfo(data));
    } catch (error) {
        console.log('Error: ', error);
    }
}
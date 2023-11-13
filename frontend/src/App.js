import Home from "./components/Home"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Appointment from "./components/Appointment"
import { useDispatch } from "react-redux"
import { loadUser } from "./actions/user"
import { useEffect } from "react"
import Patient from "./components/Patient"
import Prescription from "./components/Prescription"
import { loadPatient } from "./actions/patient"
import Admin from "./components/Admin"
import PatientMedicalInfo from "./components/PatientMedicalInfo"


function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(loadUser())
      dispatch(loadPatient())
  }, [dispatch])
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<SignUp/>}></Route>
          <Route path="/appointment" element={<Appointment/>}></Route>
          <Route path="/patient" element={<Patient/>}></Route>
          <Route path="/prescription/:id" element={<Prescription/>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/patientmedicalinfo/:id" element={<PatientMedicalInfo/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


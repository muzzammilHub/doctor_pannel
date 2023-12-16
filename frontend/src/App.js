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
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  const dispatch = useDispatch()
  const token  = localStorage.getItem("authToken")

  useEffect(()=>{
      dispatch(loadUser())
      dispatch(loadPatient())
  }, [dispatch])
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={!token ? <Login/>: <Home/>}></Route>
        <Route>
          <Route path="/" element={<ProtectedRoute Component={Home}/>}></Route>
          <Route path="/register" element={!token ? <SignUp/>: <Home/>}></Route>
          <Route path="/appointment" element={<ProtectedRoute Component={Appointment}/>}></Route>
          <Route path="/patient" element={<ProtectedRoute Component={Patient}/>}></Route>
          <Route path="/prescription/:id" element={<ProtectedRoute Component={Prescription}/>}></Route>
          <Route path="/admin" element={<ProtectedRoute Component={Admin}/>}></Route>
          <Route path="/patientmedicalinfo/:id" element={<ProtectedRoute Component={PatientMedicalInfo}/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


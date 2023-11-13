import React, {useState} from 'react'
import Layout from './Layout'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadMedicalInfo, loadPatient } from '../actions/patient'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MedicalHistory from './MedicalHistory'


const PatientMedicalInfo = () => {
const dispatch = useDispatch()
const {id} = useParams();

const [formData, setFormData] = useState({
    visittype: '',
    chiefcomplaints: '',
    bloodpressure: '',
    height: '',
    temperature: '',
    pulse: '',
    oxygenlevel: '',
    weight: '',
    history: '',
    investigation: '',
    result: '',
    treatment: '',
})

  useEffect(()=>{
    dispatch(loadPatient)

    dispatch(loadMedicalInfo(id))
  },[dispatch])

  const [state, setState] = useState(true);

  const appointments = useSelector((store)=>store.patient.action)
  
  const data = useSelector((store)=>store.patient.medicalhistory)


  const user = useSelector((store)=>store.user);

  const user_id = user.doctor._id.toString();


  let findPatient; 
  if(appointments && appointments.length >= 0){
      findPatient= appointments.find(appointment => appointment.patient._id.toString() === id);
  }


  const handleSubmit = async (e)=>{
      e.preventDefault();

      await axios.post(`http://localhost:4000/api/v1/patientmedicalinfo/?id=${id}&user_id=${user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
                  .then((data)=>{ console.log(data)})
                  .catch((error)=>{console.log(error)})

                  setState(!state);

                  dispatch(loadMedicalInfo(id))
  }

  const handleClick = ()=>{
    setState(!state);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className=" p-6 flex flex-col items-center justify-center">
    <div className="flex items-center justify-center -ml-10">
        <div className="h-20 w-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-14 flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <p className="text-black font-semibold text-4xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                {findPatient?.patient?.name[0]}
            </p>
        </div>
        <div>
            <p className="font-semibold text-3xl text-black">{findPatient?.patient?.name}</p>
            <p className="text-black">Contact Number: <span className="font-normal">{findPatient?.patient?.contactNumber}</span></p>
            <p className="text-black">Gender: <span className="font-normal">{findPatient?.patient?.gender}</span></p>
            <p className="text-black">Age: <span className="font-normal">{findPatient?.patient?.age}</span></p>
            <p className="text-black">Location: <span className="font-normal">{findPatient?.patient?.district}, {findPatient?.patient?.state}</span></p>
        </div>
    </div>
    {data?.message && state ? (
        <MedicalHistory id={id} state={state} setState={setState} />
    ) : (
        <div className="w-[60%] mx-auto mt-10">
            <form 
            className="bg-white shadow-xl rounded-lg p-8"
            onSubmit={handleSubmit}>
                <select
                    name="visittype"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:ring-2 focus:ring-blue-400"
                >
                    <option  value="Visit Type">Visit Type:</option>
                    <option  value="Routine Check-Up">Routine Check-Up</option>
                    <option  value="Sick Visit">Sick Visit</option>
                    <option  value="Follow-Up Appointment">Follow-Up Appointment</option>
                    <option  value="Emergency Visit">Emergency Visit</option>
                    <option  value="Pediatric Well-Child Visit">Pediatric Well-Child Visit</option>
                    <option  value="Wellness Visit">Wellness Visit</option>
                </select>
                <label className="text-gray-700 my-2">Patient Name</label>
                <p className="border border-gray-300 rounded p-2 text-gray-700">{findPatient?.patient?.name}</p>
                <label className="text-gray-700 my-2">Chief Complaints</label>
                <textarea
                    name="chiefcomplaints"
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 outline-none w-full focus:ring-2 focus:ring-blue-400"
                />
                <h4 className="text-gray-800 mt-4 mb-2">Vitals</h4>
                <div className="my-2">
                  <div className="flex items-center mb-4">
                    <label className="text-gray-700 mr-4 w-32 font-medium text-[0.7rem]">Blood Pressure (mmHg)</label>
                    <input
                      name="bloodpressure"
                      onChange={handleChange}
                      className="w-20 border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      type="string"
                      placeholder="000"
                    />
                    <label className="ml-12 font-medium text-gray-700 text-[0.7rem]">Height (ft)</label>
                    <input
                      name="height"
                      onChange={handleChange}
                      className="w-20 border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      type="text"
                      placeholder="000"
                    />
                  </div>
                  <div className="flex my-2">
                    <label className="text-gray-700 mr-4 w-32 font-medium text-[0.7rem]">Temperature (°C)</label>
                    <input
                      name="temperature"
                      onChange={handleChange}
                      className="w-20 border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      type="number"
                      placeholder="000"
                    />
                    <label className="ml-12 font-medium text-gray-700 text-[0.7rem]">Pulse (BPM)</label>
                    <input
                      name="pulse"
                      onChange={handleChange}
                      className="w-20 border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      type="number"
                      placeholder="000"
                    />
                  </div>
                  <div className="flex my-2">
                    <label className="text-gray-700 mr-4 w-32 font-medium text-[0.7rem]">Oxygen Levels (%)</label>
                    <input
                      name="oxygenlevel"
                      onChange={handleChange}
                      className="w-20 border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      type="number"
                      placeholder="000"
                    />
                    <label className="ml-12 font-medium text-gray-700 text-[0.7rem]">Weight (kg)</label>
                    <input
                      name="weight"
                      onChange={handleChange}
                      className="w-20 border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      type="number"
                      placeholder="000"
                    />
                  </div>
                </div>

                <label className="text-gray-700 my-2">History</label>
                <textarea
                    name="history"
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 outline-none my-2 w-full focus:ring-2 focus:ring-blue-400"
                />
                <label className="text-gray-700 my-2">Investigation Request</label>
                <textarea
                    name="investigation"
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 outline-none my-2 w-full focus:ring-2 focus:ring-blue-400"
                />
                <label className="text-gray-700 my-2">Investigation Result</label>
                <textarea
                    name="result"
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 outline-none my-2 w-full focus:ring-2 focus:ring-blue-400"
                />
                <label className="text-gray-700 my-2">Treatment</label>
                <textarea
                    name="treatment"
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 outline-none my-2 w-full focus:ring-2 focus:ring-blue-400"
                />
                <div className='flex'>
                <button
                    type="submit"
                    className="bg-green-600 text-white w-32 rounded-md p-2 mt-4 mx-auto block hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                >
                    Save
                </button>
                {data?.message && <button
                    onClick={handleClick}
                    className="bg-blue-600 text-white w-32 rounded-md p-2 mt-4 mx-auto block hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                >
                   Back
                </button>}
                </div>
            </form>
        </div>
    )}
</div>

  )
}

export default PatientMedicalInfo
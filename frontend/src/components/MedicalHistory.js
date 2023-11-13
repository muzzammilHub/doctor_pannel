import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMedicalInfo } from '../actions/patient'

const MedicalHistory = ({id, state, setState}) => {
    const dispatch = useDispatch()
    console.log('id: ',id)
    useEffect(()=>{
        dispatch(loadMedicalInfo(id))
    },[dispatch])

    const data = useSelector((store)=>store.patient.medicalhistory)
    
    console.log(data);

    const {message} = data;
    const {medicalReport} = message;

    const [expandedStates, setExpandedStates] = useState(
        medicalReport.map(() => false)
      );
    
    const toggleExpansion = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
    };

    const handleClick = ()=>{
      setState(!state);
    }
  return (
        <>
        {
            medicalReport.map((data, index)=>(
                <div className="border p-2 mt-10 max-h-screen w-[30rem]">
                <div
                  className={`bg-gray-200 cursor-pointer p-2`}
                  onClick={() => toggleExpansion(index)}
                >
                  {expandedStates[index]? "Click to Collapse" : "Click to Expand"}
                </div>
                <div
                  className={`transition-max-h duration-300 ease-in-out overflow-hidden ${
                    expandedStates[index] ? 'max-h-[400px] overflow-y-auto' : 'max-h-0'
                  }`}
                >
                  <div className="p-2 bg-white">
                <div className=' flex items-center justify-between'>
                <p className="font-semibold text-xl">
                  + Dr. {data.doctor.firstName} {data.doctor.lastName}
                </p>
                <p className="font-semibold ml-2 text-red-600">
                  {data.recordedAt.substring(0,10)}
                </p>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold">Visit Type</h4>
                    <p>{data.visittype}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Blood Pressure</h4>
                    <p>
                      {data.bloodpressure.systolic} / {data.bloodpressure.diastolic}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Height</h4>
                    <p>{data.height} ft</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Pulse</h4>
                    <p>{data.pulse} BPM</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Temperature</h4>
                    <p>{data.temperature} °C</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Weight</h4>
                    <p>{data.weight} kg</p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mt-4">History</h4>
                <ul className="list-disc pl-6">
                  {data.history.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="text-lg font-semibold mt-4">Chief Complaints</h4>
                <ul className="list-disc pl-6">
                  {data.chiefcomplaints.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4 className="text-lg font-semibold mt-4">Treatment</h4>
                {<ul className="list-disc pl-6">
                  {data.treatment.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>}
              </div>

                </div>
              </div>
            ))
        }
          <div className=' mt-10 -ml-[25.8rem]'>
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Add
          </button>
        </div>

        </>
  )
}

export default MedicalHistory
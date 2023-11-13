import Layout from './Layout'
import {useState, useRef, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MedicationIcon from '@mui/icons-material/Medication'
import generatePdfFromContent from '../actions/prescriptionSend'
import { useDispatch } from 'react-redux'
import Loader from './Loader'
import PatientMedicalInfo from './PatientMedicalInfo'

const Prescription = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState(
    `Medicine List:
    1. Medicine A - Dosage: ...
    2. Medicine B - Dosage: ...

    Test List:
    1. Test X
    2. Test Y
    `
  )
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isShow, setIsShow] = useState(false);
  const report = useRef(null)
  const {id} = useParams()

  const Doctor = useSelector((store)=>store.user)
  const {doctor} = Doctor

  // const data = useSelector((store)=>store.patient.medicalhistory)

  const appointments = useSelector((store)=>store.patient.action)

  // console.log("patients....",patients);

  let findPatient; 
  if(appointments && appointments.length >= 0){
      findPatient= appointments.find(appointment => appointment.patient._id.toString() === id);
  }

  const newContent = content.split('\n')
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePreview = ()=>{
      setPreview(!preview)
  }

  const handleShow = ()=>{
    setIsShow(!isShow);
  }
  const handleGeneratePdf = () => {
     setLoading(!loading)
     dispatch(generatePdfFromContent(report.current, 'output.pdf', findPatient.patient.email));
  };

  if(!doctor || !appointments){
    return <Loader/>
  }

  console.log('findPatient: ', findPatient);

  return (
    <Layout>
      {doctor && appointments && appointments.length >= 0 && !preview ? (<div className='flex pl-4 pr-4'><div className='flex mx-auto flex-col mt-10 bg-slate-200 flex-[0.5] p-10 h-[35rem]'>
      <ul className='flex justify-center items-center border-b border-b-slate-400'>
        <MedicationIcon/>
        <li className=' text-xl p-2'>Dr.{doctor.firstName} {doctor.lastName}</li>
        {doctor.qualification.map((item, index)=><li className=' text-xl p-2' key={index}>{item}</li>)}
        <li className=' text-xl p-2'>{doctor.speciality}</li>
      </ul>
      <ul className=' mt-10 mb-10 pl-12 pr-12'>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Patient name</p>
          <li>{findPatient.patient.name}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Age</p>
        <li>{findPatient.patient.age}Y</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Gender</p>
        <li>{findPatient.patient.gender}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Contact Number</p>
        <li>{findPatient.patient.contactNumber}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Appointment date</p>
        <li>{findPatient.appointment[findPatient.appointment.length-1].appointmentDate.substring(0,10)}</li>
        </div>
        <div className='flex justify-between border-b border-b-slate-400 p-1'>
          <p className=' font-semibold'>Appointment time</p>
        <li>{findPatient?.appointment[findPatient.appointment.length-1].appointmentTime}</li>
        </div>
      </ul>
      <textarea
        className=" p-4 border resize-none scrollbar-hide ml-10 mr-10 outline-none"
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing medicine..."
      />
      <div className='flex mt-6'>
      <button 
      onClick={handlePreview}
      className='mt-5 border border-black w-[4rem] ml-10'>Preview</button>
      <button 
      onClick={handleShow}
      className='mt-5 border border-black pl-1 pr-1 ml-10'>{!isShow ? "Medical History" : "Back"}</button>
      </div>
    </div>
    {isShow && <div className='flex-[0.5] h-[40rem] overflow-y-auto scrollbar-hide mt-5'>
      <PatientMedicalInfo/>
    </div>}
    </div>) : (!loading  ? <div
      ref={report} 
      className='flex mx-auto flex-col mt-10 mb-10 bg-slate-100 w-[50%] p-10'>
      <ul className='flex justify-center items-center border-b border-b-slate-400'>
        <MedicationIcon/>
        <li className=' text-xl p-2'>Dr.{doctor.firstName} {doctor.lastName}</li>
        {doctor.qualification.map((item, index)=><li className=' text-xl p-2' key={index}>{item}</li>)}
        <li className=' text-xl p-2'>{doctor.speciality}</li>
      </ul>
      <ul className=' mt-10 mb-10 pl-12 pr-12'>
        <div className='flex justify-between   p-1'>
          <p className=' font-semibold'>Patient name</p>
          <li>{findPatient.patient.name}</li>
        </div>
        <div className='flex justify-between p-1'>
          <p className=' font-semibold'>Age</p>
        <li>{findPatient.patient.age}Y</li>
        </div>
        <div className='flex justify-between p-1'>
          <p className=' font-semibold'>Gender</p>
        <li>{findPatient.patient.gender}</li>
        </div>
        <div className='flex justify-between p-1'>
          <p className=' font-semibold'>Contact Number</p>
        <li>{findPatient.patient.contactNumber}</li>
        </div>
        <div className='flex justify-between p-1'>
          <p className=' font-semibold'>Appointment date</p>
          <li>{findPatient.appointment[findPatient.appointment.length-1].appointmentDate.substring(0,10)}</li>
        </div>
        <div className='flex justify-between p-1'>
          <p className=' font-semibold'>Appointment time</p>
          <li>{findPatient?.appointment[findPatient.appointment.length-1].appointmentTime}</li>
        </div>
      </ul>
      {newContent.map((item,index)=>(
        <li className=' list-none ml-12' key={index}>{item}</li>
      ))}
      <div className='flex'>
     <button 
      onClick={handlePreview}
      className='mt-5 border border-black w-[4rem] ml-12'>
        Back
      </button>
      <button 
      onClick={handleGeneratePdf}
      className='mt-5 border border-black w-[4rem] ml-12'>
        Send
      </button>
      </div>
      </div> : <Loader setLoading={setLoading}/>)}
    </Layout>
  )
}

export default Prescription
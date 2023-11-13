import React from 'react'
import Layout from './Layout'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadPatient } from '../actions/patient'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import EditPatientInformationModal from './EditPatientInformationModal'
import LinkIcon from '@mui/icons-material/Link';


const Patient = () => {
const dispatch = useDispatch()
const patients = useSelector((store)=> store.patient.action)
const [searchQuery, setSearchQuery] = useState('');
const [selectedPatient, setSelectedPatient] = useState({});

  useEffect(()=>{
    dispatch(loadPatient())
  },[dispatch])

  const [isModalOpen, setIsModalOpen] = useState(false);


  let filteredPatients;

  if(patients){ 
    filteredPatients = patients.filter((patient) =>
    patient?.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  }

  const openModal = (patient) => {
    setSelectedPatient(patient)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
  };

  console.log("patient id",filteredPatients)

  return (
    <Layout>
       <div className="mb-4 mt-4 ml-5">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-blue-300 w-[20%]"
        />
      </div>
        {filteredPatients ? (<div>
        <ul
          className="flex  p-4 mb-4 bg-slate-200 ">
          <div className='w-[14rem]'><li className=' font-bold'>Name</li></div>
          <div className='w-[5rem] mr-10 ml-10'><li className=' font-bold'>Gender</li></div>
          <div className='mr-8 ml-10'><li className=' font-bold'>Age</li></div>
          <div className='mr-[4.3rem] ml-[2.8rem]'><li className=' font-bold'>Contact</li></div>
          <div className='mr-10 ml-10'><li className=' font-bold'>Appointment Date</li></div>
          <div className='mr-10 ml-10'><li className=' font-bold'>Appointment Time</li></div>
          <div className='mr-10 ml-[2.7rem]'><li className='font-bold'>Address</li></div>
        </ul>
        {filteredPatients?.map((item, index) => (
          
            <ul
            key={index}
            className="flex  p-4 mb-4 bg-white  hover:bg-slate-200 "
          >
            <div className='w-[14rem]'><li className="text-blue-600 font-bold">{item?.patient?.name}</li></div>
            <div className='w-[5rem] mr-10 ml-10'><li>{item?.patient?.gender}</li></div>
            <div className='mr-10 ml-10'><li>{item?.patient?.age}Y</li></div>
            <div className='mr-10 ml-10'><li>{item?.patient?.contactNumber}</li></div>
            <div className='mr-10 ml-10'><li>{item?.appointment[(item?.appointment.length)-1]?.appointmentDate?.substring(0, 10)}</li></div>
            <div className='mr-10 ml-[6.2rem]'><li>{item?.appointment[(item?.appointment.length)-1]?.appointmentTime}</li></div>
            <div className='mr-10 ml-[9.2rem]'><li>{item?.patient?.district},{item?.patient?.state}</li></div>
            <div >
              <EditIcon 
              className=' text-red-600 cursor-pointer'
              onClick={()=>openModal(item?.patient)}/>
              <EditPatientInformationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                selectedPatient={selectedPatient}
              />
              <Link 
              className='ml-10'
              to={"/prescription/" + item.patient._id.toString()} key={item._id}>
                <LinkIcon className=' text-lime-600 cursor-pointer'/>
              </Link>
            </div>
          </ul>
        ))}
        </div>) : null}
    </Layout>
  )
}

export default Patient
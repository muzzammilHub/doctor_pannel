import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isPrescriptionSend } from '../utils/patientSlice';

const Loader = ({setLoading}) => {
    const isSend = useSelector((store)=>store.patient.isSend)
    const dispatch = useDispatch()
    const handleClick = ()=>{
        setLoading(false)
        dispatch(isPrescriptionSend(false))
    }
    
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      {!isSend ? (<div className="loader ease-linear rounded-full border-4 border-t-4 border-black h-12 w-12"></div>) : 
      (<div>
        <p className=' text-3xl font-semibold'>Prescription send successfully<img className='h-[5rem] inline-block mb-10' src='https://www.freepnglogos.com/uploads/tick-png/image-tick-mark-icon-png-good-luck-charlie-wiki-2.png'></img></p>
        <button className=' text-lg p-2 pl-4 pr-4 bg-blue-500 text-white border-2 border-black hover:bg-blue-400' onClick={handleClick}>Back</button>
       </div>)
      }
    </div>
  );
};

export default Loader;
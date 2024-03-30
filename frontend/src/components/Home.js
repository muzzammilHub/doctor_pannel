import React, {useState} from 'react'
import Login from './Login'
import Header from './Header'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((store)=>store.user)
  const [name, setName] = useState("Muzzammil");

  const handleChange = (e)=>{
    setName(e.target.value);
  }

  return (
    <div>
      {user ? 
      <>
      <Header/>
      <div className=' bg-blue-300 h-96 flex justify-center items-center rounded-b-[28%]'>
        <div className='w-[50%]'>
          <p className='ml-20 text-4xl font-semibold'><span className=' font-extrabold text-blue-600 font-serif'>Welcome to DocPortal:</span> Your Comprehensive Doctor Portal</p>
          <p className='ml-20 mt-3 w-[32rem]'>Make the transition to an efficient and streamlined healthcare practice. Join DocPortal and experience a new era of patient care management.</p>
        </div>
        <div className='w-[50%]'>
          <img className='h-[21.8rem] mt-[2.1rem] ml-40' src='https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png'></img>
        </div>
      </div>
      <div className='h-[10rem] bg-blue-500 -mt-[6.4rem] -z-10 relative'></div>
      <div className=' h-[35rem]'>
        <p className=' text-center pt-20 font-bold text-3xl text-blue-600 font-sans'>Services we provide to Doctor</p>
        <div className=' mt-3 border-2 border-solid border-blue-700 rounded-[50%] w-[25rem] -translate-x-[50%] absolute left-[50%]'></div>
        <div className=' flex justify-evenly mt-20'>
          <div className=' h-[18rem] w-[16rem] border-4 border-double border-blue-600 rounded-md shadow-lg'>
            <img className='h-32' src='https://topflightapps.com/wp-content/uploads/2019/09/e-prescription-1024x819.png'></img>
            <h3 className='p-2 font-bold text-lg'>E-Prescription</h3>
            <p className=' p-2'>Electronic prescription, is a digital version of a traditional paper prescription provided by a healthcare professional</p>
          </div>
          <div className=' h-[18rem] w-[16rem] border-4 border-double border-blue-600 rounded-md shadow-lg'>
            <img className='h-32' src='https://img.freepik.com/premium-vector/email-envelope-concept_34259-135.jpg'></img>
            <h3 className='p-2 font-bold text-lg'>Email Service</h3>
            <p className=' p-2'>Integrate email services for secure and private prescription delivery, enhancing patient convenience.</p>
          </div>
          <div className=' h-[18rem] w-[16rem] border-4 border-double border-blue-600 rounded-md shadow-lg'>
            <img className='h-28 mt-4' src='https://cdn-icons-png.flaticon.com/512/2937/2937409.png'></img>
            <h3 className='p-2 font-bold text-lg'>Medical Chronicles</h3>
            <p className=' p-2'>Maintain a comprehensive patient history for accurate medical records, facilitating informed decisions.</p>
          </div>
          <div className=' h-[18rem] w-[16rem] border-4 border-double border-blue-600 rounded-md shadow-lg'>
            <img className='h-32' src='https://topflightapps.com/wp-content/uploads/2019/09/e-prescription-1024x819.png'></img>
            <h3 className='p-2 font-bold text-lg'>E-Prescription</h3>
            <p className=' p-2'>Electronic prescription, is a digital version of a traditional paper prescription provided by a healthcare professional</p>
          </div>
        </div>
      </div>
      <div className='h-96 bg-blue-200'>
        <p className='text-center pt-20 text-3xl font-semibold'>Our Product</p>
        <div className=' mt-3 border-2 border-solid border-black rounded-[50%] w-[25rem] -translate-x-[50%] absolute left-[50%]'></div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      </>
      :
      <Login/>}
    </div>
  )
}

export default Home
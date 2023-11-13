import React from 'react'
import Layout from './Layout'
import { useSelector } from 'react-redux'

const Admin = () => {

  const user = useSelector((store)=>store.user);
  const {doctor} = user;
  console.log(user)

  return (
    <Layout>
      <div className=' flex h-[41.6rem]'>
      <div className=' flex-[0.5]'>
      <img 
      className=' h-[40rem] mx-auto mt-[0.8rem] rounded-[50%]'
      src={`../uploads/${user?.doctor?.avatar?.filename}`}/>
      </div>
      <div className=' flex-[0.5] bg-blue-400'>
        <div className=' flex ml-10 flex-col mt-10'>
        <p className=' font-semibold text-3xl mt-2 mb-2'>Dr. {doctor?.firstName} {doctor?.lastName}</p>
        
        {doctor?.qualification.map((q)=>(
          <p className=' font-medium text-xl mt-2 mb-2'>{q}</p>
        ))}
        <p className=' font-medium text-xl mt-2 mb-2'>
          {doctor?.speciality}
        </p>

        <p className=' font-normal text-xl mt-2 mb-2'>{doctor?.email}</p>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Admin
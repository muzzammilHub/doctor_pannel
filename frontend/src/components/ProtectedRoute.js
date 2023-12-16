import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({Component}) => {
    const navigate = useNavigate()
    const token  = localStorage.getItem("authToken")
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    })

  return (
        <Component/>
  )
}

export default ProtectedRoute
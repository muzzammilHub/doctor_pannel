import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { removePatient } from '../utils/patientSlice';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async()=>{
    try {
      const {data} = await axios.get('https://backend-app-n7as.onrender.com/api/v1/logout',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      if(data.success){
        localStorage.removeItem('authToken')
        dispatch(removeUser())
        dispatch(removePatient())
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="flex justify-between items-center py-4 px-6 bg-blue-500 text-white">
      <div className="text-2xl font-bold"><Link to='/'>DocPortal</Link></div>
      <div className="flex space-x-6 items-center">
        <Link
          to={'/appointment'}
          className="cursor-pointer hover:text-gray-300">
          New Appointment
        </Link>
        <Link 
        to={'/patient'}
        className="cursor-pointer hover:text-gray-300">Patient</Link>
        <Link
        to={'/admin'} 
        className="cursor-pointer hover:text-gray-300">User</Link>
        
        <button 
          className="bg-transparent hover:bg-gray-800 text-gray-100 font-semibold py-2 px-4 border border-gray-600 rounded-full"
          onClick={handleClick}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
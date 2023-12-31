import axios from 'axios'
import { loadUserSuccess } from '../utils/userSlice'

export const loadUser = ()=> async (dispatch)=>{
    try {
        const {data} = await axios.get('https://backend-app-n7as.onrender.com/api/v1/me',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          })
          
        dispatch(loadUserSuccess(data.user))
    } catch (error) {
        console.log('error: ',error)
    }
}
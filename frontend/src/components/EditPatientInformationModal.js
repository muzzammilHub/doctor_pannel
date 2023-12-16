import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loadPatient } from '../actions/patient';

const EditPatientInformationModal = ({ isOpen, onClose, selectedPatient }) => {

  // console.log("selected patient....", selectedPatient);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    state: "",
    district: "",
    age: "",
    aadhaar: "",
    contactNumber: "",
    appointmentDate: '',
    appointmentTime: ''
  });


  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        name: selectedPatient.name || '',
        gender: selectedPatient.gender || '',
        email: selectedPatient.email || '',
        state: selectedPatient.state || '',
        district: selectedPatient.district || '',
        age: selectedPatient.age || '',
        aadhaar: selectedPatient.aadhaar || '',
        contactNumber: selectedPatient.contactNumber || '',
        appointmentDate: '',
        appointmentTime: '',
      });
    }
  }, [selectedPatient]);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

    const handleSave = async() => {
      
      try {

        const data1 = await axios.post("https://backend-app-n7as.onrender.com/api/v1/patient/register",formData,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        
        const {data} = data1;
        let id;
        if(data.message === "old"){
            const {isExistingPatient} = data;
            const {_id} = isExistingPatient;
            id = _id;
        }

        if(data.message === "new"){
          const {newPatient} = data;
          const {_id} = newPatient;
          id = _id;
      }

        if(data1.data.success){

        const data2 = await axios.post(`https://backend-app-n7as.onrender.com/api/v1/appointment/${id}`, formData,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })

        if(data1.data.success && data2.data.success){
          console.log("success")
        }
        else{
          console.log('Error: Registeration is not successfull')
        }
        }
      } catch (error) {
        console.log(error)
      }

      dispatch(loadPatient());

      onClose();
    };

    return (
      <div className={`fixed inset-0 flex items-center justify-center z-30 ${isOpen ? '' : 'hidden'}`}>
      <div className="modal w-96 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Edit Data</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="text-gray-700">Name</label>
            <input
              disabled
              type="text"
              value={selectedPatient.name}
              // onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Gender</label>
            <input
              disabled
              type="text"
              value={selectedPatient.gender}
              // onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">State</label>
            <input 
              type="text"
              name='state'
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">District</label>
            <input 
              type="text"
              name='district'
              value={formData.district}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Age</label>
            <input 
              type="number"
              name='age'
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Contact Number</label>
            <input 
              type="text"
              name='contactNumber'
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Email</label>
            <input 
              type="text"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Aadhaar</label>
            <input
              disabled 
              type="text"
              value={selectedPatient.aadhaar}
              // onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Appointment Date</label>
            <input 
              type="date"
              name='appointmentDate'
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700">Appointment Time</label>
            <input 
              type="time"
              name='appointmentTime'
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mr-2">
            Save
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
    );
  };

export default EditPatientInformationModal
import { useEffect, useState } from "react";
import axios from "axios"
import Layout from "./Layout";
import SuccessPopup from "./SuccessPopup";

const statesOfIndia = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

const Appointment = ()=>{
  const [isPopupVisible, setPopupVisible] = useState(false);
    const [age , setAge] = useState("")
    const [name, setName] = useState("")
    const [state, setState] = useState('');
    const [gender, setGender] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [aadhaar, setAadhaar] = useState('')
    const [email, setEmail] = useState('')
    const [district, setDistrict] = useState('')
    const [appointmentDate, setAppointmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {

          const data1 = await axios.post("https://backend-app-n7as.onrender.com/api/v1/patient/register",{name, age, state, district,gender, contactNumber, aadhaar, email},{
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

          const data2 = await axios.post(`https://backend-app-n7as.onrender.com/api/v1/appointment/${id}`, {appointmentDate, appointmentTime},{
            headers:{
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          })

          if(data1.data.success && data2.data.success){
            setPopupVisible(true)
          }
          else{
            console.log('Error: Registeration is not successfull')
          }
          }
        } catch (error) {
          console.log(error)
        }
    }

    const handlePopupClose = ()=>{
      setPopupVisible(false)
    }
    

    return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
        <div className="w-[60%]">
          <form onSubmit={handleSubmit}>
              <div className=" flex">
              <div className="mr-20 w-[65%]"> 
              <div className=" mb-10">
                  <p className="text-2xl font-bold">Patient Information</p>
              </div> 
              <div>
                  <div className=" mt-4 mb-4">
                      <label>Name</label>
                      <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  <div className=" mt-4 mb-4">
                      <label>Age</label>
                      <input
                      type="text"
                      name="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  <div className="mt-4 mb-4">
                  <label>Select State</label>
                  <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  >
                      <option value="">Select a state</option>
                      {statesOfIndia.map((state, index) => (
                      <option key={index} value={state}>
                          {state}
                      </option>
                      ))}
                  </select>
                  </div>
                  <div className=" mt-4 mb-4">
                      <label>District</label>
                      <input
                      type="text"
                      name="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="District"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  <div className=" mt-4 mb-4">
                  <label>Gender:</label>
                  <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                  </select>
                  </div>
                  <div className=" mt-4 mb-4">
                      <label>Contact Number</label>
                      <input
                      type="tel"
                      name="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="Contact Number"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  <div className="mt-4 mb-4">
                      <label>Email</label>
                      <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  <div  className=" mt-4 mb-4">
                      <label>Aadhaar</label>
                      <input
                      type="text"
                      name="aadhaar"
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value)}
                      placeholder="Aadhaar Number"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  </div>
              </div>
              <div className="w-[35%]">
                <div className=" mb-10">  
                <p className="text-2xl font-bold">Appointment</p>
                </div>
                <div className=" mt-4 mb-4">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className=" mt-4 mb-4">
                  <label>Appointment Time</label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
            <div>
              <button
                type="submit"
                className="block mx-auto mt-6 px-6 py-3 text-white bg-indigo-500 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[100%]"
              >
                Submit
              </button>
            </div>
            </div>
            </div>
          </form>
        </div>
     </div>
     {isPopupVisible && <SuccessPopup onClose={handlePopupClose} />}
    </Layout>
    )
}

export default Appointment
const Patient = require('../models/patient')
const Appointment = require('../models/appointment')
const MedicalHistory = require('../models/medicalhistory')

exports.patientRegisteration = async (req, res)=>{
    try {

        console.log("patient registeration***********",req.body)

        const {
            name,
            gender,
            state,
            district,
            age,
            contactNumber,
            email,
            aadhaar
        } = req.body 


        const isExistingPatient = await Patient.findOne({aadhaar: aadhaar});

        if(isExistingPatient){

            console.log("**********is",isExistingPatient)

            isExistingPatient.name = name;
            isExistingPatient.gender = gender;
            isExistingPatient.state = state;
            isExistingPatient.district = district;
            isExistingPatient.age = age;
            isExistingPatient.contactNumber = contactNumber;
            isExistingPatient.email = email;

            // Save the updated patient data back to the database
            await isExistingPatient.save();

            return res.status(201).json({
                success: true,
                message: "old",
                isExistingPatient,
            })
        }
    


        const newPatient = await Patient.create({
            name,
            gender,
            state,
            district,
            age,
            contactNumber,
            email,
            aadhaar,
        })
       
        return res.status(201).json({
            success: true,
            message: "new",
            newPatient: newPatient,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.appointment = async (req, res)=>{
    try {

        console.log("appointment*********",req.body)
        
        const {
            appointmentDate,
            appointmentTime,
        } = req.body

        const existingAppointment = await Appointment.findOne({
            patient: req.params.id,
            doctor: req.user._id,
        })
        const appointment = {
            appointmentDate,
            appointmentTime
        }
        if(existingAppointment){
            existingAppointment.appointment.push(appointment);

            await existingAppointment.save()

            return res.status(201).json({
                success: true,
                message: existingAppointment,
            })
        }


        const newAppointment = await Appointment.create({
            appointment: [{
                appointmentDate,
                appointmentTime
        }],
            doctor: req.user._id,
            patient: req.params.id
        })

        return res.status(201).json({
            success: true,
            message: newAppointment,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.allPatientDetail = async (req,res)=>{
    try {

        const instances = await Appointment.find({}).populate("patient")

        const filteredData = instances.filter(instance => instance.doctor.toString() === req.user._id.toString());

        return res.status(201).json({
            success: true,
            filteredData,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.medicalInfo = async(req, res)=>{
    try {


        const {

            visittype,
            chiefcomplaints,
            bloodpressure,
            height,
            temperature,
            pulse,
            oxygenlevel,
            weight,
            history,
            investigation,
            result,
            treatment,

        } = req.body;

        const bp = bloodpressure.split('/');

        console.log("********", bp);

        const systolic = Number(bp[0]);
        const diastolic = Number(bp[1]);

        console.log("$$$$", systolic, diastolic);

        const MedicalReport = await MedicalHistory.findOne({patient:req.query.id})

        if(MedicalReport){
            const medicalInfo =  {
                visittype,
                chiefcomplaints,
                bloodpressure: {
                    systolic: systolic,
                    diastolic: diastolic
                },
                height,
                temperature,
                pulse,
                oxygenlevel,
                weight,
                history,
                investigation,
                result,
                treatment,
                doctor: req.query.user_id,
            };

            MedicalReport.medicalReport.push(medicalInfo);

            await MedicalReport.save();

            return res.status(201).json({
                success: true,
                message: MedicalReport
            })
        }

        

        const medicalHistory = await MedicalHistory.create({
            patient: req.query.id,
            medicalReport: [{
            visittype,
            chiefcomplaints,
            bloodpressure: {
                systolic: systolic,
                diastolic: diastolic
            },
            height,
            temperature,
            pulse,
            oxygenlevel,
            weight,
            history,
            investigation,
            result,
            treatment,
            doctor: req.query.user_id,
        }]
    })
        
        return res.status(201).json({
            success: true,
            message: medicalHistory
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getMedicalInfo = async (req, res)=>{
    try {
        const id = req.query.id;

        const medicalInfo = await MedicalHistory.findOne({patient: id}) .populate("medicalReport.doctor")

        return res.status(201).json({
            success: true,
            message: medicalInfo,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

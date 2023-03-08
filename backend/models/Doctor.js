const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    address:{
        type: String
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    specialization:{
        type: String,
        required: true
    },
    pendingAppointments: [
        {
            patientName: String,
            slotNo: Number,
            date: Date,
            description: String
        }
    ],
    finishedAppointments: [
        {
            patientName: String,
            slotNo: Number,
            date: Date,
            description: String
        }
    ],
    dateOfCreation:{
        type: Date,
        default: Date.now
    }
  });
  const Doctor = mongoose.model('doctor', DoctorSchema);
  module.exports = Doctor;
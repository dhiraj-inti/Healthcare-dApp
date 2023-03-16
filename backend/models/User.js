const mongoose = require('mongoose');
const AppointmentSchema = require('./Appointment');
const PrescriptionSchema = require('./Prescription');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
    prescriptionHistory: [ PrescriptionSchema ],
    appointmentsBooked: [ AppointmentSchema ],
    appointmentTransactions: [ String ],
    ipfsPath: {
        type: String,
        required: true
    },
    dateOfCreation:{    
        type: Date,
        default: Date.now
    }
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;
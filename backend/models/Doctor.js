const mongoose = require('mongoose');
const AppointmentSchema = require('./Appointment');
const PrescriptionSchema = require('./Prescription');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    specialization: {
        type: String,
        required: true
    },
    pendingAppointments: [AppointmentSchema],
    finishedAppointments: [PrescriptionSchema],
    dateOfCreation: {
        type: Date,
        default: Date.now
    }
});
const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;
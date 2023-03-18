const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
    doctorId: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    patientId:{
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    slotNo: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

})

module.exports = AppointmentSchema;
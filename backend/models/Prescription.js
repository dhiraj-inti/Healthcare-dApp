const mongoose = require('mongoose');
const { Schema } = mongoose;

const PrescriptionSchema = new Schema({
    doctorId: {
        type: Number,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    patientId:{
        type: Number,
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
    },
    description: {
        type: String,
        required: true
    }
})


module.exports = PrescriptionSchema;
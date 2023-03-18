const mongoose = require('mongoose');
const PrescriptionSchema = require('./Prescription');
const { Schema } = mongoose;

const PharmacistSchema = new Schema({
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
    pendingPrescription: [PrescriptionSchema],
    receiptsGenerated: [PrescriptionSchema],
    receiptTransactions: [String],
    dateOfCreation: {
        type: Date,
        default: Date.now
    }
})

const Pharmacist = mongoose.model('pharmacist', PharmacistSchema);
module.exports = Pharmacist;
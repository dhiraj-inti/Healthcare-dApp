const express = require('express');
const router = express.Router();
const fetchdoctor = require('../middleware/fetchdoctor');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const { body, validationResult } = require('express-validator');
const PrescriptionSchema = require('../models/Prescription');


// ROUTE 1: Add a prescription(done by doctor but reflected in User also). Login required
router.post('/addprescription', fetchdoctor, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.doctor.id).select("-password");
        const prescription = {
            doctorId: req.doctor.id,
            doctorName: req.body.doctorName,
            patientId: req.body.patientId,
            patientName: req.body.patientName,
            slotNo: req.body.slotNo,
            date: Date(req.body.date),
            description: req.body.description
        }


        doctor.finishedAppointments.push(prescription)
        doctor.save();

        const user = await User.findById(req.body.patientId).select("-password");
        user.prescriptionHistory.push(prescription);
        user.save();

        res.json({
            success: true,
            prescription
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
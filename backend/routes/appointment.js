const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const Doctor = require('../models/Doctor');


// ROUTE 1: Boook an appointment(done by User but reflected in Doctor also). Login required
router.post('/bookappointment', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const appointment = {
            patientId: req.user.id,
            patientName: req.body.patientName,
            doctorId: req.body.doctorId,
            doctorName: req.body.doctorName,
            slotNo: req.body.slotNo,
            date: Date(req.body.date),
        }

        user.appointmentsBooked.push(appointment);
        user.save();

        if (req.body.doctorId > 100) {
            const doctor = await Doctor.findById(req.body.doctorId).select("-password");
            doctor.pendingAppointments.push(appointment);
            doctor.save();
        }


        res.json({
            success: true,
            appointment
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Add an appointment hash to user's schema "api/auth/prescription/addtransaction". Login required
router.post('/addtransaction', fetchuser, async (req, res) => {
    try {
        const transaction = req.body.transaction
        const user = await User.findById(req.user.id).select("-password");
        user.appointmentTransactions.push(transaction);
        user.save();

        res.json({
            success: true,
            transaction
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
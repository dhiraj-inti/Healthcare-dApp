const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchdoctor = require('../middleware/fetchdoctor')
var jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


// ROUTE 1: Create a User using: POST "/api/auth/doctor/createdoctor". No login required
router.post('/createdoctor', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('dob', 'Invalid Date Of Birth').isLength({ min: 10, max: 10 }),
    body('phoneNumber', "Invalid Phone Number").isLength({ min: 10, max: 10 })
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let doctor = await Doctor.findOne({ email: req.body.email });
        doctor = await Doctor.findOne({ phoneNumber: req.body.phoneNumber });
        if (doctor) {
            return res.status(400).json({ error: "Sorry a doctor with this email/phone number already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new doctor
        doctor = await Doctor.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            dob: new Date(req.body.dob),
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            specialization: req.body.specialization
        });
        const data = {
            doctor: {
                id: doctor.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);


        // res.json(user)
        res.json({ success: true, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let doctor = await Doctor.findOne({ email });
        if (!doctor) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, doctor.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            doctor: {
                id: doctor.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});

// ROUTE 3: Get loggedin Doctor Details using: POST "/api/auth/doctor/getdoctor". Login required
router.post('/getdoctor', fetchdoctor, async (req, res) => {

    try {
        const doctorId = req.doctor.id;
        const doctor = await Doctor.findById(doctorId).select("-password")
        res.send(doctor)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Get all doctors details using: POST "/api/auth/doctor/getalldoctors".
router.get('/getalldoctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.send(doctors)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
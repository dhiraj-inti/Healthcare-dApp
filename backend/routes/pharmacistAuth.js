const express = require('express');
const Pharmacist = require('../models/Pharmacist');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchpharmacist = require('../middleware/fetchpharmacist')
var jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


// ROUTE 1: Create a User using: POST "/api/auth/pharmacist/createpharmacist". No login required
router.post('/createpharmacist', [
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
        let pharmacist = await Pharmacist.findOne({ email: req.body.email });
        pharmacist = await Pharmacist.findOne({ phoneNumber: req.body.phoneNumber });
        if (pharmacist) {
            return res.status(400).json({ error: "Sorry a pharmacist with this email/phone number already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new pharmacist
        pharmacist = await Pharmacist.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            dob: new Date(req.body.dob),
            address: req.body.address,
            phoneNumber: req.body.phoneNumber
        });
        const data = {
            pharmacist: {
                id: pharmacist.id
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
        let pharmacist = await Pharmacist.findOne({ email });
        if (!pharmacist) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, pharmacist.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            pharmacist: {
                id: pharmacist.id
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


// ROUTE 3: Sell medicines pharmacist Details using: POST "/api/auth/pharmacist/sellprescription". Login required
router.post('/sellprescription', fetchpharmacist, async (req, res) => {

    try {
        const pharmacistId = req.pharmacist.id;
        const pharmacist = await Pharmacist.findById(pharmacistId).select("-password")
        const prescription = {
            doctorId: req.body.doctorId,
            doctorName: req.body.doctorName,
            patientId: req.body.patientId,
            patientName: req.body.patientName,
            slotNo: req.body.slotNo,
            date: Date(req.body.date),
            description: req.body.description
        }

        if (req.body.idOfPendingPrescription) {
            pharmacist.pendingPrescription = pharmacist.pendingPrescription.filter((ele) => ele._id.toString() !== req.body.idOfPendingPrescription)
            pharmacist.receiptsGenerated.push(prescription)
            pharmacist.save()
        }
        else{
            pharmacist.receiptsGenerated.push(prescription)
            pharmacist.save()
        }

        res.send({ "idOfReceipt": pharmacist.receiptsGenerated[pharmacist.receiptsGenerated.length - 1]._id, prescription })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Get loggedin pharmacist Details using: POST "/api/auth/pharmacist/getpharmacist". Login required
router.post('/getpharmacist', fetchpharmacist, async (req, res) => {

    try {
        const pharmacistId = req.pharmacist.id;
        const pharmacist = await Pharmacist.findById(pharmacistId).select("-password")
        res.send(pharmacist)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Add receipts generated transactions using: POST "/api/auth/pharmacist/addtransaction". Login required
router.post('/addtransaction', fetchpharmacist, async (req, res) => {

    try {
        const transaction = req.body.transaction
        const pharmacist = await Pharmacist.findById(req.pharmacist.id).select("-password");
        pharmacist.receiptTransactions.push(transaction)
        pharmacist.save();

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
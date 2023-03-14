const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
//const fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'SASTRAMiniProject';


// ROUTE 1: Create a User using: POST "/api/auth/doctor/createdoctor". No login required
router.post('/createdoctor', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('dob','Invalid Date Of Birth').isLength({min:10,max:10}),
    body('phoneNumber',"Invalid Phone Number").isLength({min:10,max:10})
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        dob: new Date(req.body.dob),
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        specialization: req.body.specialization
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
  
  
      // res.json(user)
      res.json({ success:true, authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
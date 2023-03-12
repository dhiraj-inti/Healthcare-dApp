const mongoose = require('mongoose');
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
    medicalHistory: [
        {
            doctorName: String,
            slotNo: Number,
            date: Date,
            description: String
        }
    ],
    transactions: [ String ],
    dateOfCreation:{    
        type: Date,
        default: Date.now
    }
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;
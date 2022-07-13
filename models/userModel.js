const mongoose = require('mongoose');
const validator = require('validator');

//User Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'user must have a name'],
    },
    contactNumber: {
        type: String,
        trim: true,
        required: [true, 'user must have a contact'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    
});


const User = mongoose.model('User', userSchema);

module.exports = User;
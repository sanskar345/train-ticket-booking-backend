const mongoose = require('mongoose');

//Seat Schema

const seatSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        required: [true, 'Seat must have a status']
    },
    seatNumber: {
        type: Number,
        required: [true, 'Seat must have a seat number'],    
    },
    bookedBy: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    bookedAt: {
        type: String,
        trim: true,
    }

});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
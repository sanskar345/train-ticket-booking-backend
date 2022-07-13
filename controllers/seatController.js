const Seat = require('../models/seatModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Fetching all seats from database and converting 1d array to 2d array

exports.getAllSeats = catchAsync(async (req, res, next) => {

    //sorting the documents on the basis of seatNumber property and fetching all

    const seats = await Seat.find({}).sort('seatNumber');

    //conversion of 1d array to 2d array

    const newSeats = [];

    while(seats.length){
        newSeats.push(seats.splice(0,7));
    }

    res.status(200).json({
        status: 'success',
        results: newSeats.length,
        data: newSeats
    });

});

// For creation of 80 seats in database

exports.create80Seats = catchAsync(async (req, res, next) => {

    const seat = {
        status: false,
        seatNumber: 1,
        bookedBy: null,
        bookedAt: null
    }

    await Seat.deleteMany({});

    for(let i=0; i<80; i++){
        await Seat.create(seat);
        seat.seatNumber++;
    }

    res.status(201).json({
        status: 'success'
    });
});

//Updating seats by id and if seat not found by id returning error

exports.updateSeatById = catchAsync(async (req, res, next) => {


    const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if(!updatedSeat){
        return next(new AppError('Cannot find Seat with this id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {updatedSeat}
    });
    
});

//Unbooking all seats by changing the status, bookedAt, bookedBy parameter in documents

exports.unbookAllSeats = catchAsync(async (req, res, next) => {

    await Seat.updateMany({}, {status: false, bookedAt: null, bookedBy: null});

    res.status(200).json({
        status: 'success',
    });
    
});

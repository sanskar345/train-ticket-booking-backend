const express = require('express');

const seatController = require('../controllers/seatController');

const router = express.Router();

// Create 80 Seats Route

router
  .route('/create-80-seats')
  .post(seatController.create80Seats)

// Unbook all seats Route

router
  .route('/unbook-all-seats')
  .patch(seatController.unbookAllSeats)

//Get all seats route

router
  .route('/')
  .get(seatController.getAllSeats)


//Update seats by id route

router
  .route('/:id')
  .patch(seatController.updateSeatById)


module.exports = router;

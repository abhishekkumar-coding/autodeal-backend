const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'phone') 
      .populate('carId', 'brand model year price');

    res.status(200).json({ message: 'All Bookings', bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update booking status
const updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    )
      .populate('userId', 'phone') 
      .populate('carId', 'brand model year price'); 

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated', booking: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getAllBookings, updateBooking };

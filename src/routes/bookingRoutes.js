const express = require('express')
const {getAllBookings, updateBooking} = require("../controllers/bookingController");

const router = express.Router();


router.get('/allBookings', getAllBookings);
router.put('/:id', updateBooking)
module.exports = router
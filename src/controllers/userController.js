const User = require("../models/User");
const Booking = require("../models/Booking");
const sendWhatsAppMessage = require("../services/whatsappService");
const Car = require("../models/Car");

const registerUser = async (req, res) => {
    try {
        const { phone, carId, bookingType } = req.body;
        console.log(req.body);

        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone });
        }

        const booking = await Booking.create({
            userId: user._id,
            carId,
            bookingType,
            phone,
            status: "PENDING"
        });
        let car = await Car.findOne({_id : carId})
        console.log(car)
        await sendWhatsAppMessage(phone,
            `Hi! ${car.model} book karne ke liye, kripya apna Driving License ka photo bhejein. Booking ID: ${booking._id}`
        );

        res.json({ success: true, user, booking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = registerUser;

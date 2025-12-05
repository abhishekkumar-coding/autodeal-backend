const mongoose  = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    phone: { type: String, required: true }, // user ke WhatsApp number
    bookingType:{type:String},
    status: { type: String, enum: ["PENDING", "VERIFIED", "REJECTED"], default: "PENDING" },
    documentUrl: { type: String }, // WhatsApp se upload hua file ka URL
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// bookingSchema.pre("save", function(next) {
//     this.updatedAt = Date.now();
//     next();
// });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking
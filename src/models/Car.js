// models/Car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  price: { type: String, required: true },
  fuel: { type: String, required: true },
  trans: { type: String, required: true }, 
  mileage: { type: String, required: true },
  image: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }

});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;

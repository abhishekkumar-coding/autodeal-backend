const cloudinary = require('../config/cloudinary');
const Car = require('../models/Car');

const addCar = async (req, res) => {
    try {
        console.log("Request received to add a car");
        console.log("Request body:", req.body);

        const { brand, model, year, color, price, fuel, trans, mileage } = req.body;

        if (!req.file) {
            console.warn("No image file provided in request");
            return res.status(400).json({ message: "Image is required" });
        }

        console.log("Uploading image to Cloudinary...");

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'cars' },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        console.log("Image uploaded successfully:", result.secure_url);
                        resolve(result);
                    }
                }
            );
            stream.end(req.file.buffer);
        });

        console.log("Creating new Car document...");
        const car = new Car({
            brand,
            model,
            year,
            color,
            price,
            fuel,
            trans,
            mileage,
            image: result.secure_url,
        });

        await car.save();
        console.log("Car saved successfully in DB:", car);

        res.status(201).json({ message: "Car added successfully", car });

    } catch (error) {
        console.error("Error in addCar controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ message: "All Cars", cars });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { addCar, getAllCars };

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addCar, getAllCars } = require("../controllers/carsController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addcar", upload.single("image"), addCar);
router.get("/allcars", getAllCars);

module.exports = router;

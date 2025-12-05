// src/app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes')
const whatsppRoutes = require('./routes/whatsapp')
const carRoutes = require('./routes/carRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Hello server started")
})
app.use("/api/users", userRoutes);

app.use("/whatsapp", whatsppRoutes)


app.use('/api/cars',carRoutes )

app.use('/api/booking',bookingRoutes )

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});


module.exports = app;

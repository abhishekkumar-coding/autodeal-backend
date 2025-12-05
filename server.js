// server.js
require('dotenv').config();
const app = require('./src/app');
const connectDb = require('./src/config/db');

const PORT = process.env.PORT || 4000;


// console.log(process.env.MONGO_URL)

connectDb()

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

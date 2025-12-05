const Booking = require("../models/Booking");

const receiveMessage = async (req, res) => {
    try {
        const from = req.body.From;       
        const numMedia = req.body.NumMedia;  
        console.log("Whatsapp request body : ", req.body)

        if (numMedia === "0") {
            return res.send(`<Response><Message>Kripya apna Driving License ka photo bhejein.</Message></Response>`);
        }

        const imageUrl = req.body.MediaUrl0;
        const mediaType = req.body.MediaContentType0;
        const phone = from.replace("whatsapp:", "");

        const booking = await Booking.findOne({ phone, status: "PENDING" }).sort({ createdAt: -1 });
        console.log("Before Updating : ",booking )

        booking.documentUrl = imageUrl;
        const response = await booking.save();
        console.log("After Updating : ",response )
        
        return res.send(`<Response><Message>DL image receive ho gaya 🙏</Message></Response>`);

    } catch (err) {
        console.log(err);
        res.send(`<Response><Message>Error occurred</Message></Response>`);
    }
};

module.exports = receiveMessage;

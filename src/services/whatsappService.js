const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const sendWhatsAppMessage = async (phone, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: "whatsapp:+14155238886",
            to: "whatsapp:" + phone,
        });
        console.log("Message sent:", response.sid);
    } catch (error) {
        console.error("Failed to send message:", error.message);
    }
};


module.exports = sendWhatsAppMessage;

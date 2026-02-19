const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Note: To use this, you must set up a Firebase Cloud Functions environment
// and install the necessary dependencies: `npm install firebase-functions firebase-admin twilio`

admin.initializeApp();

// You would need to sign up for Twilio (or similar) and get these credentials
// const twilioSid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
// const twilioToken = "your_auth_token";
// const twilioClient = require('twilio')(twilioSid, twilioToken);
// const whatsappFrom = "whatsapp:+14155238886"; // Twilio Sandbox Number
// const adminPhone = "whatsapp:+917075976451"; 

exports.onNewOrderCreated = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
        const orderData = snap.data();
        const orderId = context.params.orderId;

        console.log(`New order created: ${orderId}. Sending notification...`);

        const messageBody = `New Order Received used System Push!
Order ID: ${orderId}
Customer: ${orderData.customerName}
Amount: ₹${orderData.amount}
Items: ${orderData.items ? orderData.items.length : 0}`;

        try {
            // UNCOMMENT BELOW TO ENABLE TWILIO WHATSAPP
            /*
            await twilioClient.messages.create({
                body: messageBody,
                from: whatsappFrom,
                to: adminPhone
            });
            console.log("WhatsApp sent.");
            */

            // For now, allow simple logging to prove the trigger works if deployed
            console.log("System would push message: ", messageBody);
            return null;
        } catch (error) {
            console.error("Error sending WhatsApp notification:", error);
            return null;
        }
    });

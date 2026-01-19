import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage(
  { text, template, number } = {
    text: "You're invited to the wedding of Parth",
    template:
      "https://img.freepik.com/premium-vector/minimal-invitation-card-template-design_1109750-56.jpg?w=2000",
    number: "9723250547",
  }
) {
  const message = await client.messages.create({
    // contentSid: process.env.TWILIO_CONTENT_SID,
    // contentVariables: JSON.stringify({ message: text, template: template }),
    body: text,
    mediaUrl: [template],
    from: "whatsapp:+14155238886",
    to: `whatsapp:+91${number}`,
  });

  console.log(message.body);
}

// createMessage();
async function sendSMS({text,number}={text:"Hello from Twilio!",number:"9723250547"}) {
  const message = await client.messages.create({
    body: text,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${number}`,
  });
  console.log(message.body);
}

sendSMS();
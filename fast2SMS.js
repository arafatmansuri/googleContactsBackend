// import fast2Sms from "@api/fast2sms";
import dotenv from "dotenv";
import fast2Sms from "fast2sms";
dotenv.config();

// fast2Sms
//   .get_devbulkV21(
//     {
//       route: "q",
//       message: "Hello",
//       numbers: "9723250547",
//     },
//     {
//       authorization: process.env.FAST2SMS_API_KEY,
//     },
//   )
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

const options = { API_KEY: process.env.FAST2SMS_API_KEY };
fast2Sms.init(options);
fast2Sms
  .send({
    message: 'The SMS content e.g. "This is a message from Fast2SMS"',
    to: "9723250547", // single number
    // numbers: "9723250547", // single number
    // to: [9723250547, 9876543210], // multiple numbers
    // sender_id: "FSTSMS",
    route: "qt",
  })
  .then(function (data) {
    console.log("data................", data);
  })
  .catch(function (error) {
    console.log("err.................", error);
  });

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const { sendMail } = require("../utilities/sendMail");
const otpSchema = new Schema({
  otpNumber: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  email: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// send mail to the user
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await sendMail(
      email,
      "Verification Email",
      "your otp is  <b>" + otp + "</b>",
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otpNumber);
      next();
    }
  } catch (err) {
    console.log("Error sending user email");
  }
});
const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;


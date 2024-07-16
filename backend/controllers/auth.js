const User = require("../models/User");
const Otp = require("../models/Otp");
const { generateOtp } = require("../utilities/otp");
const jwt = require("jsonwebtoken");
const { passwordHash } = require("../utilities/password");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");

exports.getuser = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("Invalid Api Access");
    }
    const email = user?.email;
    if (!email) {
      throw new Error("Invalid Route Access");
    }
    const userDetails = await User.findOne({ email });
    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user: userDetails,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err?.message,
      reponse: {},
    });
  }
};
exports.signup = async (req, res) => {
  try {
    // get all details
    const {
      firstName,
      lastName = " ",
      password,
      confirmPassword,
      email,
      accountType,
      otp,
    } = req.body;
    // validate details
    if (
      !firstName ||
      !password ||
      !confirmPassword ||
      !email ||
      !accountType ||
      !otp
    ) {
      throw new Error("missing properties");
    }
    // chech password validation
    if (password !== confirmPassword) {
      throw new Error("password not matched");
    }
    // check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("user already existed");
    }
    // check for the latest otp and match it with the given one
    const recentOtpDoc = await Otp.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // if validated otp then hash the password
    if (otp != recentOtpDoc.otpNumber) {
      throw new Error("otp not matched");
    }
    // hash password
    const hashPassword = await passwordHash(password, 10);
    // generate null profile
    const profileDetails = await Profile.create({
      gender: null,
      dob: "",
      about: null,
      contactNumber: "",
    });

    // create user with given details
    let userPayload = {
      firstName,
      lastName,
      accountType,
      email,
      password: hashPassword,
      image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
      profile: profileDetails._id,
      courses: [],
      courseProgress: [],
    };
    const userDoc = await User.create(userPayload);
    if (!userDoc) {
      throw new Error("user not found");
    }
    // return response success
    return res.status(200).json({
      success: true,
      message: "User signin successfully",
      response: userDoc,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please fill all details");
    }
    // find the user with email
    const user = await User.findOne({ email: email })
      .populate("profile")
      .exec();
    if (!user) {
      throw new Error("User Not Found");
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error("Password not Matched");
    }
    // create a session for the user
    const JWT_SECRET = process.env.JWT_SECRET;
    // create a jwt with header payload signature
    const JWT_PAYLOAD = {
      userId: user._id,
      email,
    };
    const token = jwt.sign(JWT_PAYLOAD, JWT_SECRET, { expiresIn: "1d" });
    // store in the browser cookies
    res.cookie("token", token, { httpOnly: true, maxAge: 90000 });
    user.token = token;
    user.active = true;
    user.email = email;
    // find the profile
    const profileId = user?.profile || null;
    if (profileId == null) {
      throw new Error("Could Not Fetch User Profile Details");
    }
    const profile = await Profile.findById(profileId);
    await user.save();
    // save in cookie
    return res.status(200).json({
      success: true,
      message: "token generated redirecting user",
      response: {
        token,
        user,
        profile,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};
exports.sendOTP = async (req, res) => {
  try {
    // input data
    const { email } = req.body;
    //validate data
    if (!email) {
      return res.status(401).json({
        message: "please send email",
        success: false,
      });
    }
    // generate new otp
    let otpNumber = await generateOtp();
    // create entry to database
    // it pre call the mail sender function and send mail to user
    const otpDoc = await Otp.create({ email, otpNumber });

    return res.status(200).json({
      success: true,
      message: "otp Sended successfully",
      response: otpDoc,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.changeAccountType = async (req, res) => {
  try {
    // input details
    const { userId, ADMIN_ACCESS_KEY, accountType } = req.body;

    // validate detials
    if (!userId || !ADMIN_ACCESS_KEY) {
      throw new Error("missing properties");
    }
    if (ADMIN_ACCESS_KEY != process.env.ADMIN_ACCESS_KEY) {
      throw new Error("you can'n cahnge account type");
    }
    // find user
    const user = await User.findById(userId);

    // validate user
    if (!user) {
      throw new Error("user not exist");
    }
    // change user role
    user.accountType = accountType;
    // save user
    await user.save();
    // return res
    return res.status(200).json({
      success: true,
      message: "changed user account type",
      response: {},
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Please Send all details");
    }
    res.cookies?.token ? res.clearCookie("token") : true;
    // mark user active false
    const user = await User.findOne({ email });
    user.token = null;
    user.active = false;
    user.save();
    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
      reponse: {},
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// login user
const loginUser = async (req, res) => {
  const { phone } = req.body;
  try {
    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
    }

    const user = await userModel.findOne({ phone });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// register user
const registerUser = async (req, res) => {
  const { phone } = req.body;
  try {
    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
    }

    // checking if user already exists
    const exists = await userModel.findOne({ phone });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const newUser = new userModel({
      phone: phone
    });

    // save the new user
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { loginUser, registerUser };

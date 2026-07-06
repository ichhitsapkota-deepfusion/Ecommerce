const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "my_super_secret_key_123";

exports.registerUser = async (email, password, role, isActive, phoneNumber) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,
    role,
    isActive,
    phoneNumber,
  });

  const savedUser = await newUser.save();

  return savedUser;
};




exports.loginUser = async (email, password) => {

  const user = await User.findOne({ email });


  if (!user) {
    throw new Error("User not found!");
  }

  if (user.role !== "admin") {
    throw new Error("Access denied. Only admins can log in.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const secret = JWT_SECRET;
  const token = jwt.sign({ userId: user._id, role: user.role }, secret, {
    expiresIn: "1h",
  });

  return token;
};

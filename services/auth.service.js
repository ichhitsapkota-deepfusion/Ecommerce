const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

// In a real app, this goes in your .env file!
const JWT_SECRET = 'my_super_secret_key_123'; 

exports.registerUser = async (email, password, role, isActive, phoneNumber) => {
  
    const newUser = new userModel({
      email,
      password,
      role,
      isActive,
      phoneNumber
    });


    const savedUser = await newUser.save();

  return savedUser;
};

exports.loginUser = async (email, password) => {
  // 1. Find the user by email
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  // 2. Compare the plain password with the hashed password in the DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  // 3. Generate the JWT (The VIP Wristband)
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
  return token;
};
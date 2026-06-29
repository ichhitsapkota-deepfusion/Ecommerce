const authService = require('../services/auth.service');

exports.signup = async (req, res) => {
  try {
    const { email, password, role, isActive, phoneNumber } = req.body;

    
    const user = await authService.registerUser(email, password, role, isActive, phoneNumber);
    
    res.status(201).json({ message: 'User registered successfully!', userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    
    res.status(200).json({ message: 'Login successful!', token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
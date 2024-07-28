const User = require('../models/user');

// Create User
const createUser = async (req, res) => {
  try {
    const { email, name, mobile } = req.body;

    // Validate user input
    if (!email || !name || !mobile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ email, name, mobile });
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve User Details by name
const getUserDetailsByName = async (req, res) => {
    try {
      const users = await User.find({ name: req.params.name }).select('-__v');
      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  createUser,
  getUserDetailsByName,
};

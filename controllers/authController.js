const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send the token via email
const sendToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const msg = {
    to: user.email,
    from: 'kanikagola26@gmail.com', // Use your verified SendGrid sender
    subject: 'Your Verification Token',
    text: `Your verification token is: ${token}`,
  };

  await sgMail.send(msg);
};

// Register or login user
const registerOrLoginUser = async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, mobile });
      await user.save();
    }

    await sendToken(user);
    res.status(200).json({ message: 'Verification token sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json({ message: 'User authenticated', user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  registerOrLoginUser,
  verifyToken,
};

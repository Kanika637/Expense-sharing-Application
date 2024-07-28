const { check, validationResult } = require('express-validator');

// Validation rules for creating a user
const validateUser = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('mobile').notEmpty().withMessage('Mobile number is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation rules for adding an expense
const validateExpense = [
  check('description').notEmpty().withMessage('Description is required'),
  check('amount').isNumeric().withMessage('Amount must be a number'),
  check('paidBy').notEmpty().withMessage('PaidBy is required'),
  check('participants').isArray().withMessage('Participants should be an array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUser,
  validateExpense
};

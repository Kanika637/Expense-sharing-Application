const express = require('express');
const {
  addExpense,
  getUserExpenses,
  getAllExpenses,
  downloadBalanceSheet,
} = require('../controllers/expenseController');

const { validateExpense } = require('../middleware/validationMiddleware');

const router = express.Router();

// Add Expense
router.post('/', validateExpense,addExpense);

// Retrieve Individual User Expenses by Name
router.get('/user/:name', getUserExpenses);

// Retrieve Overall Expenses
router.get('/', getAllExpenses);

// Download Balance Sheet
router.get('/balance-sheet', downloadBalanceSheet);

module.exports = router;

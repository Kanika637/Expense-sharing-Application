const Expense = require('../models/expense');
const User = require('../models/user');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');


// Add Expense and also adds a new user if it is not present
const addExpense = async (req, res) => {
    try {
      const { description, amount, paidBy, participants, splitType } = req.body;
  
      // Ensure paidBy user exists, create if they don't
      let userPaidBy = await User.findOne({ email: paidBy.email });
      if (!userPaidBy) {
        userPaidBy = new User({ name: paidBy.name, email: paidBy.email, mobile: paidBy.mobile });
        await userPaidBy.save();
      }
  
      // Ensure all participants exist and create if they don't
      const validatedParticipants = await Promise.all(participants.map(async participant => {
        let user = await User.findOne({ email: participant.email });
        if (!user) {
          user = new User({ name: participant.name, email: participant.email, mobile: participant.mobile });
          await user.save();
        }
        return { userId: user._id, amount: participant.amount };
      }));
  
      // Validate and calculate splits
      switch (splitType) {
        case 'equal':
          const equalAmount = amount / participants.length;
          validatedParticipants.forEach(participant => {
            participant.amount = equalAmount;
          });
          break;
        case 'exact':
          const totalExact = validatedParticipants.reduce((sum, participant) => sum + participant.amount, 0);
          if (totalExact !== amount) {
            return res.status(400).json({ message: 'Total exact amounts do not equal the total expense amount' });
          }
          break;
        case 'percentage':
          const totalPercentage = participants.reduce((sum, participant) => sum + participant.amount, 0);
          if (totalPercentage !== 100) {
            return res.status(400).json({ message: 'Percentages do not add up to 100%' });
          }
          validatedParticipants.forEach(participant => {
            participant.amount = (participant.amount / 100) * amount;
          });
          break;
        default:
          return res.status(400).json({ message: 'Invalid split type' });
      }
  
      const expense = new Expense({
        description,
        amount,
        paidBy: userPaidBy._id,
        participants: validatedParticipants,
        splitType
      });
  
      await expense.save();
  
      // Populate paidBy and participants fields
      const populatedExpense = await Expense.findById(expense._id)
        .populate('paidBy', 'name email')
        .populate('participants.userId', 'name email');
  
      res.status(201).json(populatedExpense);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  
// Get Individual User Expenses
const getUserExpenses = async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.name });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch expenses where the user is the payer or a participant
      const expenses = await Expense.find({
        $or: [
          { 'paidBy': user._id },
          { 'participants.userId': user._id }
        ]
      })
        .populate('paidBy', 'name email')
        .populate('participants.userId', 'name email');
  
      // Calculate the user's share in each expense
      const userExpenses = expenses.map(expense => {
        const userShare = expense.participants.find(participant => participant.userId._id.equals(user._id));
        return {
          description: expense.description,
          totalAmount: expense.amount,
          paidBy: {
            name: expense.paidBy.name,
            email: expense.paidBy.email
          },
          userShare: userShare ? {
            name: user.name,
            email: user.email,
            amount: userShare.amount
          } : null,
          splitType: expense.splitType,
          createdAt: expense.createdAt,
          updatedAt: expense.updatedAt
        };
      });
  
      res.status(200).json(userExpenses);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

// Get Overall Expenses
const getAllExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find()
        .populate('paidBy', 'name email')
        .populate('participants.userId', 'name email')
        .lean(); // Convert MongoDB documents to plain JavaScript objects
  
      const formattedExpenses = expenses.map(expense => ({
        _id: expense._id,
        description: expense.description,
        amount: expense.amount,
        paidBy: expense.paidBy ? {
          name: expense.paidBy.name,
          email: expense.paidBy.email,
        } : null,
        participants: expense.participants.map(participant => ({
          name: participant.userId ? participant.userId.name : null,
          email: participant.userId ? participant.userId.email : null,
          amount: participant.amount,
        })),
        splitType: expense.splitType,
        createdAt: expense.createdAt,
        updatedAt: expense.updatedAt,
      }));
  
      res.status(200).json(formattedExpenses);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  

// Download Balance Sheet 
const downloadBalanceSheet = async (req, res) => {
    try {
      const expenses = await Expense.find().populate('paidBy', 'name email').populate('participants.userId', 'name email');
  
      if (expenses.length === 0) {
        return res.status(404).json({ message: 'No expenses found' });
      }
  
      // Define CSV file path
      const csvFilePath = path.join(__dirname, '../balance-sheet.csv');
  
      // Create CSV writer
      const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'description', title: 'DESCRIPTION' },
          { id: 'amount', title: 'AMOUNT' },
          { id: 'paidBy', title: 'PAID BY' },
          { id: 'participants', title: 'PARTICIPANTS' },
          { id: 'splitType', title: 'SPLIT TYPE' },
          { id: 'createdAt', title: 'CREATED AT' }
        ]
      });
  
      // Prepare data for CSV
      const records = expenses.map(expense => ({
        description: expense.description,
        amount: expense.amount,
        paidBy: `${expense.paidBy.name} (${expense.paidBy.email})`,
        participants: expense.participants.map(p => `${p.userId.name} (${p.userId.email}): ${p.amount}`).join(', '),
        splitType: expense.splitType,
        createdAt: expense.createdAt.toISOString()
      }));
  
      // Write records to CSV file
      await csvWriter.writeRecords(records);
  
      // Send CSV file as response
      res.download(csvFilePath, 'balance-sheet.csv', (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).json({ message: 'Server error', error: err.message });
        }
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  

module.exports = {
  addExpense,
  getUserExpenses,
  getAllExpenses,
  downloadBalanceSheet,
};

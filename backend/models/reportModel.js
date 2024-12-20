const mongoose = require('mongoose');

// Define the report schema
const reportSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you're storing user IDs as ObjectId
    ref: 'User', // Reference to the User model
    required: true,
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp when a report is created
  },
});

// Create the Report model
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

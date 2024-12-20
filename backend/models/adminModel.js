// models/Admin.js
const mongoose = require('mongoose');

// Define the Admin Schema
const adminSchema = new mongoose.Schema({
  key: {
    type: String,  // You can also use other data types if required, e.g., Number
    required: true,
  },
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

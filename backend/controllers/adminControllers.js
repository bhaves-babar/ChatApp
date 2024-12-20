const Admin = require("../models/adminModel");
const User = require("../models/UserModel"); // Import the User model
const Report = require("../models/reportModel"); // Import the Report model

const checkAdminKey = async (req, res) => {
  try {
    const { key } = req.body;

    // Check if key exists in the Admin collection
    const admin = await Admin.findOne({ key });

    if (admin) {
      return res.status(200).json({ valid: true, message: "Key is valid" });
    } else {
      return res.status(401).json({ valid: false, message: "Invalid key" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ valid: false, message: "Server error", error: error.message });
  }
};

// Function to get all users (only returning _id, name, and email)
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users, only selecting _id, name, and email
    const users = await User.find({}, "_id name email");

    if (users.length > 0) {
      return res.status(200).json(users); // Return filtered users
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Function to get all reports from the Report collection
const getAllReports = async (req, res) => {
  try {
    // Fetch all reports and populate reportedBy and reportedUser with their names and emails
    const reports = await Report.find()
      .populate("reportedBy", "_id name email") // Populate reportedBy with _id, name, and email from the User model
      .populate("reportedUser", "_id name email"); // Populate reportedUser with _id, name, and email from the User model

    if (reports.length > 0) {
      return res.status(200).json(reports); // Return all reports with populated user data
    } else {
      return res.status(404).json({ message: "No reports found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { checkAdminKey, getAllUsers, getAllReports };

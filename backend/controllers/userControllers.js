// userControllers.js
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Report =require('../models/reportModel');
const { generateToken } = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter All Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("faild to create account ");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(`Email :${email} Pass ${password}`);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("login done");
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // Select only _id, name, and email fields and exclude others
  const users = await User.find(keyword).select("_id name email");

  res.send(users);
});

const reportUser = asyncHandler(async (req, res) => {
  const { reportedBy, reportedUser, description } = req.body;

  if (!reportedBy || !reportedUser || !description) {
    res.status(400);
    throw new Error("Please provide all fields: reportedBy, reportedUser, and description.");
  }

  // Find the reporting and reported users
  const reportingUser = await User.findById(reportedBy);
  const reportedPerson = await User.findById(reportedUser);

  if (!reportingUser || !reportedPerson) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Create the report
  const report = await Report.create({
    reportedBy: reportingUser._id,
    reportedUser: reportedPerson._id,
    description,
    timestamp: new Date(), // Automatically sets the current time
  });

  // Respond with the newly created report
  if (report) {
    res.status(201).json({
      _id: report._id,
      reportedBy: {
        _id: reportingUser._id,
        name: reportingUser.name,
        email: reportingUser.email,
      },
      reportedUser: {
        _id: reportedPerson._id,
        name: reportedPerson.name,
        email: reportedPerson.email,
      },
      description: report.description,
      timestamp: report.timestamp,
    });
  } else {
    res.status(400);

    throw new Error("Failed to create the report.");
  }
});

module.exports = { registerUser, authUser, allUsers ,reportUser};
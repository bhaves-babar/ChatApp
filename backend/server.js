const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRouts');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes=require("./routes/adminRoutes");
const reportRoutes=require("./routes/reportRoutes")
// const admin=require("./models/adminModel");
// const report=require("./models/reportModel");
const { errorHandler, notFound } = require('./middlewere/errorMiddlewere');
const cors = require('cors');
const app = express();

// Connect to database
connectDB();

// Enable CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse incoming JSON data
app.use(express.json());

// Define API routes
app.use('/bb/user', userRoutes);
app.use('/bb/chats', chatRoutes);
app.use("/bb/message", messageRoutes);
app.use("/bb/admin",adminRoutes);
// app.use("/bb/report", reportRoutes);
// Custom error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start the Express server
const server = app.listen(5000, () => {
  console.log("Server online at http://localhost:5000");
});

// Setup Socket.IO with CORS
const io = require("socket.io")(server, {
  pingTimeout: 60000, // Timeout for connection (60 seconds)
  cors: {
    origin: "http://localhost:3000", // Allow the React frontend
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // Handle user setup (join room with user's unique ID)
  socket.on("setup", (userData) => {
    if (!userData || !userData._id) {
      console.error("Invalid user data received:", userData);
      return;
    }

    socket.join(userData._id); // Join the user's room using their _id
    socket.emit("connected");
  });

  // Handle user joining a specific chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // Emit typing events to other users in the room
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handle new message sent by a user
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat || !chat.users) {
      return console.log("chat or chat.users not defined");
    }

    // Send the new message to all users in the chat except the sender
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // Handle user disconnection
  socket.off("setup", (userData) => {
    console.log("USER DISCONNECTED");
    if (userData && userData._id) {
      socket.leave(userData._id); // Ensure that the user leaves the room on disconnection
    }
  });
});

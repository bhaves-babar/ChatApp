const mongoose = require('mongoose');

const MessagesModel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Fix reference to 'User'
    },
    content: { type: String, trim: true },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",  // Fix reference to 'Chat', ensure you have this model
    }
  },
  {
    timestamps: true  // Plural form for timestamps
  }
);

const Message = mongoose.model('Message', MessagesModel);
module.exports = Message;

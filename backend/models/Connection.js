import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 300,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
connectionSchema.index({ sender: 1, receiver: 1 });
connectionSchema.index({ receiver: 1, status: 1 });

const Connection = mongoose.model('Connection', connectionSchema);

export default Connection;

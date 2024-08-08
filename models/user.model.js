

// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    unique: true,
    trim: true,
    validate(value) {
      if (!value.match(/^\+?1?\d{9,15}$/)) {
        throw new Error('Phone number must be entered in the format: +999999999. Up to 15 digits allowed');
      }
    },
  },
  referralCode: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  technology: {
    type: [String],
  },
  images: [
    {
      fileName: { type: String, required: true },
      fileType: { type: String, required: true },
      file: { type: String, required: true },
    },
  ],
  dateOfBirth: {
    type: Date,
  },
  points: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
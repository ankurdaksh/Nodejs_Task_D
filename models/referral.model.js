// models/Referral.js
import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});


const Referral = mongoose.model('Referral', referralSchema);

export default Referral;
import mongoose from 'mongoose';

const SummarySchema = new mongoose.Schema({
  input: String,
  summary: String,
  timestamp: { type: Date, default: Date.now },
});

export const Summary =
  mongoose.models.Summary || mongoose.model('Summary', SummarySchema);

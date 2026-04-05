const mongoose = require('mongoose');

const PerformerSchema = new mongoose.Schema({
  category: { type: String, default: 'performer' },
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  location: { type: String, required: true },
  venue: String,
  performanceType: String,
  duration: Number,
  fee: Number,
  technicalRider: String,
  ageGroup: String,
  language: String,
  additionalNotes: String,
}, { timestamps: true });

module.exports = mongoose.model('Performer', PerformerSchema);
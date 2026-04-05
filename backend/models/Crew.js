const mongoose = require('mongoose');

const CrewSchema = new mongoose.Schema({
  category: { type: String, default: 'crew' },
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  location: { type: String, required: true },
  venue: String,
  crewType: String,
  numberOfPeople: Number,
  shiftHours: Number,
  certifications: String,
  accommodation: String,
  meals: String,
  additionalNotes: String,
}, { timestamps: true });

module.exports = mongoose.model('Crew', CrewSchema);
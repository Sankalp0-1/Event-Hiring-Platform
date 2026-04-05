const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema({
  category: { type: String, default: 'planner' },
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  location: { type: String, required: true },
  venue: String,
  budget: Number,
  guestCount: Number,
  experienceLevel: String,
  servicesRequired: String,
  preferredStyle: String,
  decisionTimeline: String,
  additionalNotes: String,
}, { timestamps: true });

module.exports = mongoose.model('Planner', PlannerSchema);
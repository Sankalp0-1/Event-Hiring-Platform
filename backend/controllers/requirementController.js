const Planner = require('../models/Planner');
const Performer = require('../models/Performer');
const Crew = require('../models/Crew');

const modelMap = { planner: Planner, performer: Performer, crew: Crew };

exports.createRequirement = async (req, res) => {
  try {
    const { category, ...data } = req.body;
    const Model = modelMap[category];
    if (!Model) return res.status(400).json({ error: 'Invalid category' });

    const requirement = await new Model({ category, ...data }).save();
    res.status(201).json({ success: true, data: requirement });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRequirements = async (req, res) => {
  try {
    const { category } = req.query;
    const Model = modelMap[category];
    if (!Model) return res.status(400).json({ error: 'Invalid category' });
    const results = await Model.find().sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


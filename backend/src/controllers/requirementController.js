const Requirement = require('../models/Requirement');

const createRequirement = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      startDate,
      endDate,
      location,
      venue,
      category,
      categoryDetails,
    } = req.body;

    const requirement = new Requirement({
      eventName,
      eventType,
      startDate,
      endDate: endDate || null,
      location,
      venue: venue || null,
      category,
      categoryDetails,
    });

    const saved = await requirement.save();

    res.status(201).json({
      success: true,
      message: 'Requirement posted successfully!',
      data: saved,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error creating requirement:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requirements });
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { createRequirement, getRequirements };

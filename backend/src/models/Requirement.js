const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: ['Wedding', 'Corporate', 'Party', 'Concert', 'Other'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
      default: null,
    },
    category: {
      type: String,
      required: [true, 'Hiring category is required'],
      enum: ['planner', 'performer', 'crew'],
    },
    categoryDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Category details are required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Requirement', requirementSchema);

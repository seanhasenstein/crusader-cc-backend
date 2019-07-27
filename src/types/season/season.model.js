const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      enum: ['Cross Country', 'Track & Field'],
      required: true
    },
    year: {
      type: String,
      required: true,
      trim: true
    },
    studentAthletes: {
      type: [String]
    },
    orders: {
      type: mongoose.Types.ObjectId
    },
    isActive: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

const Season = mongoose.model('season', seasonSchema);

module.exports = Season;

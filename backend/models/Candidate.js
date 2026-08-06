const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Candidate profile URL is required'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Candidate name is required'],
      trim: true,
    },
    headline: {
      type: String,
      default: '',
      trim: true,
    },
    bio: {
      type: String,
      default: '',
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: '',
      trim: true,
    },
    platform: {
      type: String,
      enum: ['github', 'linkedin', 'behance', 'x', 'dribbble', 'portfolio', 'other'],
      default: 'other',
    },
    skillTags: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      enum: ['Junior', 'Mid', 'Senior', 'Lead', 'Executive'],
      default: 'Mid',
    },
    relevanceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 75,
    },
    isShortlisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Candidate', candidateSchema);

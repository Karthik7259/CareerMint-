const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  current: { type: Boolean, default: false },
  description: { type: String },
  achievements: [{ type: String }]
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String },
  current: { type: Boolean, default: false },
  gpa: { type: String },
  achievements: [{ type: String }]
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  startDate: { type: String },
  endDate: { type: String },
  url: { type: String },
  github: { type: String }
});

const resumeSchema = new mongoose.Schema({
  // Personal Information
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String }
  },

  // Professional Summary
  summary: { type: String },

  // Experience
  experience: [experienceSchema],

  // Education
  education: [educationSchema],

  // Skills
  skills: {
    technical: [{ type: String }],
    soft: [{ type: String }],
    languages: [{ type: String }]
  },

  // Projects
  projects: [projectSchema],

  // Certifications
  certifications: [{
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    url: { type: String }
  }],

  // Additional sections
  awards: [{
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String }
  }],

  // Template and styling
  template: { type: String, default: 'modern' },
  theme: { type: String, default: 'blue' },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  companyLogo: {
    type: String,
    default: 'https://via.placeholder.com/100/0077B5/FFFFFF?text=Company'
  },
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a job description'],
    maxlength: 5000
  },
  requirements: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    required: [true, 'Please add a location'],
    trim: true
  },
  locationType: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    default: 'On-site'
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
    default: 'Full-time'
  },
  experienceLevel: {
    type: String,
    enum: ['Entry level', 'Mid level', 'Senior level', 'Executive'],
    default: 'Entry level'
  },
  salary: {
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  applicants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'accepted', 'rejected'],
      default: 'pending'
    }
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search and filtering
jobSchema.index({ title: 'text', description: 'text', company: 'text' });
jobSchema.index({ location: 1, status: 1 });
jobSchema.index({ skills: 1, status: 1 });
jobSchema.index({ createdAt: -1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;

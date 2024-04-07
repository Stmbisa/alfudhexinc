// import mongoose from "mongoose";
const mongoose = require('mongoose')
import { nanoid } from 'nanoid';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true,'Title is required'],
      min: [30,'Minimum length for title is at least 30 letters'],
    },
    desc: {
      type: String,
      required: [true,'Description is required'],
      min: [255,'Minimum length for description is at least 255 letters'],
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },// we should find a way of making this autogenerated from the title
  },
  { timestamps: true }
);



const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });



const jobSchema = new mongoose.Schema({
  category: { // Change from String to reference the Category model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: [30, 'Minimum length for title is at least 30 letters'],
  },
  description: {
    type: String,
    required: true,
    min: [255, 'Minimum length for description is at least 255 letters'],
  },
  location: {
    type: String,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: [0, 'Price per hour cannot be negative']
  },
  estimatedHours: {
    type: Number,
    required: true,
    min: [0, 'Estimated hours cannot be negative']
  },
  estimatedAmount: { // Calculated field
    type: Number
  },
  userId: { // Link to the user who posted the job
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

jobSchema.pre('validate', function(next) { // Use 'validate' to generate slug before saving
  if (this.isNew) { // Only generate a slug for new jobs
    let generatedSlug = this.title.toLowerCase().replace(/ /g, '-'); // Basic slugification

    // Ensure uniqueness by appending a suffix
    const checkSlug = async (slug) => {
      const existing = await Job.findOne({ slug });
      if (existing) {
        return checkSlug(`${slug}-${nanoid(6)}`); // Recursive check with suffix
      }
      return slug;
    };

    checkSlug(generatedSlug).then((finalSlug) => {
      this.slug = finalSlug;
      next();
    });
  } else {
    next();
  }
});
// Calculate estimated amount before saving
jobSchema.pre('save', function(next) {
  this.estimatedAmount = this.pricePerHour * this.estimatedHours;
  next();
});


const jobTrackingSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
    unique: true, // Ensure one tracking entry per job
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  completeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });


const packageTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});

const shippingSchema = new mongoose.Schema({
  packageType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PackageType',
    required: true
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  destinationCountry: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered'], // Limit to specific statuses
    default: 'Pending',
  },
}, { timestamps: true });



const translationSchema = new mongoose.Schema({
  originLanguage: {
    type: String,
    required: true
  },
  currentLocation: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  spokenLanguage: {
    type: String,
    required: true
  },
  targetLanguage: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });


const storySchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });






export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export const Category = mongoose.models?.Category || mongoose.model("Category", categorySchema);
export const Job = mongoose.models?.Job || mongoose.model("Job", jobSchema);
export const PackageType = mongoose.models?.PackageType || mongoose.model("PackageType", packageTypeSchema);
export const Shipping = mongoose.models?.Shipping || mongoose.model("Shipping", shippingSchema);
export const Translation = mongoose.models?.Translation || mongoose.model("Translation", translationSchema);
export const JobTracking = mongoose.models?.JobTracking || mongoose.model("JobTracking", jobTrackingSchema);
export const Story = mongoose.models?.Story || mongoose.model("Story", storySchema);


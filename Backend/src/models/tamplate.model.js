import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Template = mongoose.model('Template', templateSchema);

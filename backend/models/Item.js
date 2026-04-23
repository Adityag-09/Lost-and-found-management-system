const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Please provide an item name'],
      trim: true,
      maxlength: [100, 'Item name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: [true, 'Please specify if item is Lost or Found'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date'],
    },
    contactInfo: {
      phone: {
        type: String,
        required: [true, 'Please provide contact phone number'],
      },
      email: {
        type: String,
        required: [true, 'Please provide contact email'],
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Index for searching by name
ItemSchema.index({ itemName: 'text', description: 'text' });

module.exports = mongoose.model('Item', ItemSchema);

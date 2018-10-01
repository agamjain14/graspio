/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const AutoIncrementR = require('mongoose-sequence')(mongoose);

// Validate Function to check body length
let descriptionLengthChecker = (desc) => {
  // Check if e exists
  if (!desc) {
    return false; // Return error
  } else {
    // Check length of desc string
    if (desc.length < 3 || desc.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

// Array of Username validators
const descValidators = [
  // First body validator
  {
    validator: descriptionLengthChecker,
    message: 'Description must be at least 3 characters but no more than 500'
  }
];


// Validate Function to check comment length
let commentLengthChecker = (comment) => {
  // Check if comment exists
  if (!comment[0]) {
    return false; // Return error
  } else {
    // Check comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comment length requirement is not met
    } else {
      return true; // Return comment as valid
    }
  }
};

// Array of Comment validators
const commentValidators = [
  // First comment validator
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];


// REVISION Model Definition
const revisionSchema = new Schema({

    description: { type: String, required: true, validate: descValidators },
    createdBy: {type: String, },
    taskID: { type: Number},
    submittedOn: {type: Date, default: Date.now()},
    submittedBy: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
    },
    comments: [{
      comment: { type: String, validate: commentValidators },
      commentator: { type: String }
    }]
});

// Export Module/Schema
module.exports = mongoose.model('Revision', revisionSchema);
/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Validate Function to check e-mail length
let titleLengthChecker = (title) => {
  // Check if e-mail exists
  if (!title) {
    return false; // Return error
  } else {
    // Check the length of e-mail string
    if (title.length < 5 || title.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid e-mail format
let validTitleChecker = (title) => {
  // Check if e-mail exists
  if (!title) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); // Return regular expression test results (true or false)
  }
};

// Array of Email Validators
const titleValidators = [
  // First Email Validator
  {
    validator: titleLengthChecker,
    message: 'Title must be at least 5 characters but no more than 30'
  },
  // Second Email Validator
  {
    validator: validTitleChecker,
    message: 'Must be a valid title'
  }
];

// Validate Function to check body length
let bodyLengthChecker = (body) => {
  // Check if body exists
  if (!body) {
    return false; // Return error
  } else {
    // Check length of body string
    if (body.length < 3 || body.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};



// Array of Username validators
const bodyValidators = [
  // First body validator
  {
    validator: bodyLengthChecker,
    message: 'Body must be at least 3 characters but no more than 500'
  }
];


// Task Model Definition
const taskSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: {type: String, },
  _id: { type: Number},
  createdAt: {type: Date, default: Date.now()},
  assignedTo: {type: String, default: ''}
},{ _id: false });
taskSchema.plugin(AutoIncrement);

// Export Module/Schema
module.exports = mongoose.model('Task', taskSchema);
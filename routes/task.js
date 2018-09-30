const User = require('../models/user'); // Import User Model Schema
const Task = require('../models/task'); // Import Task Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {
  /* ===============================================================
     CREATE NEW Task
  =============================================================== */
  router.post('/newTask', (req, res) => {
    // Check if task title was provided
    if (!req.body.title) {
      res.json({ success: false, message: 'task title is required.' }); // Return error message
    } else {
      // Check if task body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'task body is required.' }); // Return error message
      } else {
        // Check if task's creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'task creator is required.' }); // Return error
        } else {
          // Create the task object for insertion into database
          const task = new Task({
            title: req.body.title, // Title field
            body: req.body.body, // Body field
            createdBy: req.body.createdBy // CreatedBy field
          });
          // Save task into database
          task.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the title field
                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message }); // Return error message
                } else {
                  // Check if validation error is in the body field
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'task saved!' }); // Return success message
            }
          });
        }
      }
    }
  });


  /* ===============================================================
     GET ALL TASKS
  =============================================================== */
  router.get('/allTasks', (req, res) => {
    // Search database for all task posts
    Task.find({}, (err, tasks) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if tasks were found in database
        if (!tasks) {
          res.json({ success: false, message: 'No tasks found.' }); // Return error of no tasks found
        } else {
          res.json({ success: true, tasks: tasks }); // Return success and tasks array
        }
      }
    }).sort({ '_id': -1 }); // Sort tasks from newest to oldest
  });

  /* ===============================================================
     GET SINGLE TASK BASED ON ID
  =============================================================== */
  router.get('/singleTask/:id', (req, res) => {
    // Search database for all task posts
    if (!req.params.id) {
      res.json({ success: false, message: 'No task ID was provided' });
    } else {
      Task.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
          res.json({ success: false, message: 'Not valid Task' });
        } else {
          if (!task) {
            res.json({ success: false, message: 'Task Not found' });
          } else {
            res.json({ success: true, task: task });
          }
        }
      });
    }
  });
  /* ===============================================================
     UPDATE SINGLE TASK
  =============================================================== */
  router.put('/updateTask/:id', (req, res) => {
    // Search database for all task posts
    if (!req.params.id) {
      res.json({ success: false, message: 'No task ID was provided' });
    } else {
      Task.findByIdAndUpdate(req.params.id,{$set: {assignedTo: req.body.assignedTo}},(err,task) => {
        if (err) {
          res.json({ success: false, message: 'Not valid Task' });
        } else {
          if (!task) {
            res.json({ success: false, message: 'Task Not found' });
          } else {
            res.json({ success: true, task: task });
          }
        }
      });
    }
  });
  

    /* ===============================================================
     GET ALL TASKS BASED ON USER
  =============================================================== */
  router.get('/allTaskforuser/:assignedTo', (req, res) => {
    // Search database for all task posts
    Task.find({ assignedTo: req.params.assignedTo }, (err, tasks) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if tasks were found in database
        if (!tasks) {
          res.json({ success: false, message: 'No tasks found.' }); // Return error of no tasks found
        } else {
          res.json({ success: true, tasks: tasks }); // Return success and tasks array
        }
      }
    }).sort({ '_id': -1 }); // Sort tasks from newest to oldest
  });

  return router;
};
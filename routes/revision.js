const Revision = require('../models/revision'); // Import Task Model Schema
const User = require('../models/user');
module.exports = (router) => {
  /* ===============================================================
     CREATE NEW REVISION
  =============================================================== */
  router.post('/newRevision', (req, res) => {
    // Check if task title was provided
    if (!req.body.description) {
        res.json({ success: false, message: 'Revision description is required.' }); // Return error message
        } else {
        // Check if task body was provided
        if (!req.body.taskID) {
            res.json({ success: false, message: 'task ID is required.' }); // Return error message
        } else {
            // Check if Revision's submitter was provided
            if (!req.body.submittedBy) {
            res.json({ success: false, message: 'revsion submitter is required.' }); // Return error
            } else {
            // Create the task object for insertion into database
            const revision = new Revision({
                description: req.body.description, // Title field
                taskID: req.body.taskID, // Body field
                submittedBy: {
                    id: req.body.submittedBy.id,
                    username: req.body.submittedBy.username
                }
            });
            // Save revision into database
            revision.save((err) => {
                // Check if error
                if (err) {
                    // Check if error is a validation error
                    if (err.errors) {
                        // Check if validation error is in the title field
                        if (err.errors.description) {
                        res.json({ success: false, message: err.errors.description.message }); // Return error message
                        } else {
                            // Check if validation error is in the body field
                            if (err.errors.taskID) {
                                res.json({ success: false, message: err.errors.taskID.message }); // Return error message
                            } else {
                                res.json({ success: false, message: err }); // Return general error message
                            }
                        }
                    } else {
                        res.json({ success: false, message: err }); // Return general error message
                    }
                } else {
                    res.json({ success: true, message: 'Revision saved!' }); // Return success message
                }
            });
            }
        }
    }
  });

/* ===============================================================
     COMMENT ON REVISION POST
=============================================================== */
router.post('/comment', (req, res) => {
    // Check if comment was provided in request body
    if (!req.body.comment) {
      res.json({ success: false, message: 'No comment provided' }); // Return error message
    } else {
      // Check if id was provided in request body
      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided' }); // Return error message
      } else {
        // Use id to search for revision post in database
        Revision.findOne({ _id: req.body.id }, (err, revision) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: 'Invalid revision id' }); // Return error message
          } else {
            // Check if id matched the id of any revision post in the database
            if (!revision) {
              res.json({ success: false, message: 'Revision not found.' }); // Return error message
            } else {
              // Grab data of user that is logged in
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: 'Something went wrong' }); // Return error message
                } else {
                  // Check if user was found in the database
                  if (!user) {
                    res.json({ success: false, message: 'User not found.' }); // Return error message
                  } else {
                    // Add the new comment to the revision post's array
                    revision.comments.push({
                      comment: req.body.comment, // Comment field
                      commentator: user.username // Person who commented
                    });
                    // Save revision post
                    revision.save((err) => {
                      // Check if error was found
                      if (err) {
                        res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Comment saved' }); // Return success message
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });


  /* ===============================================================
     GET ALL REVISIONS BASED ON SUBMITTEDBY
  =============================================================== */
  router.get('/allTaskRevision/:idt', (req, res) => {
    // Search database for all task posts
    Revision.find({ taskID : req.params.idt }, (err, revisions) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if revision were found in database
        if (!revisions) {
          res.json({ success: false, message: 'No revision found.' }); // Return error of no tasks found
        } else {
          res.json({ success: true, revisions: revisions }); // Return success and tasks array
        }
      }
    }).sort({ '_id': -1 }); // Sort tasks from newest to oldest
  });



  /* ===============================================================
     GET ALL REVISIONS BASED ON SUBMITTEDBY
  =============================================================== */
  router.get('/allRevision/:id', (req, res) => {
    // Search database for all task posts
    Revision.find({ 'submittedBy.id' : req.params.id }, (err, revisions) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if revision were found in database
        if (!revisions) {
          res.json({ success: false, message: 'No revision found.' }); // Return error of no tasks found
        } else {
          res.json({ success: true, revisions: revisions }); // Return success and tasks array
        }
      }
    }).sort({ '_id': -1 }); // Sort tasks from newest to oldest
  });
  return router;



};
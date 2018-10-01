const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    // uri: 'mongodb://localhost:27017/graspio',
    uri: 'mongodb://admin:admin12@ds163781.mlab.com:63781/graspio',
    secret: crypto,
    db : 'graspio'
}
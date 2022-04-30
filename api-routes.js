// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Website is Working',
        message: 'Welcome to the backend',
    });
});
// Import controller
var Controller = require('./Controller');

router.route('/reports')
    .get(Controller.view)    
    .post(Controller.new)
    .delete(Controller.delete);

// Export API routes
module.exports = router;
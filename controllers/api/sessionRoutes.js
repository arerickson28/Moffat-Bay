const router = require('express').Router();

// this route retrieves session data so we can check if a user is logged in or not
router.get('/getSession', (req, res) => {
    res.json({
        logged_in: req.session.logged_in || false,
        userName: req.session.userName || null
    });
});

module.exports = router;
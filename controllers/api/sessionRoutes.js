const router = require('express').Router();

router.get('/getSession', (req, res) => {
  res.json({
    logged_in: req.session.logged_in || false,
    userName: req.session.userName || null
  });
});

module.exports = router;
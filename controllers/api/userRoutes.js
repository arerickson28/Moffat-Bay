const router = require('express').Router();
const { User } = require('../../models');


//create user
// will look like will look like http://localhost:3001/api/users/create
router.post('/createUser', async (req, res) => {

  try {

    // this bit checks to make sure there is a request body, if not, it gets mad
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    // this bit checks to make sure the frontend has sent the data required to create a new user
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({ error: 'missing required fields. To create a new user, a firstName, lastName, email, password, and phoneNumber are needed' });
    }

    // return a stub response so the frontend developers can verify they're successfully passing data to the backend
    const stubResponse = {
      message: 'received POST data for createUser endpoint. This endpoint is a stub. It does not yet interact with database.',
      data: req.body
    }

    res.status(200).json(stubResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//log in user
// will look like http://localhost:3001/api/users/loginUser
router.post('/loginUser', async (req, res) => {

  try {

    // this bit checks to make sure there is a request body, if not, it gets mad
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    // this bit checks to make sure the frontend has sent the data required to attempt a user login
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'missing required fields. To attempt to login a user, a username and password are needed' });
    }

    // look in the database for a user with the provided username/email
    const userData = await User.findOne({ where: { email: req.body.username } });

    // if the user record is not found, send back a "not found" message
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // if the user record is found but the provided password does not match the user record, send back a "not found" message
    if (userData.dataValues.password !== req.body.password) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // when given username and password match a user record, add the user to the session and set the logged_in status to true
    req.session.save(() => {
      req.session.userId = userData.dataValues.id;
      req.session.userName = userData.dataValues.usename;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

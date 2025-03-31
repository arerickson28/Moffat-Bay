const router = require('express').Router();
// const { User } = require('../../models');


//create user
// will look like will look like http://localhost:3001/api/users/create
router.post('/createUser', async (req, res) => {

    try {
        const accountCreatedMessage = {
            "message": "congrats, you've created an account!"
          }
        
            res.status(200).json(accountCreatedMessage);
    }catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
  });

//log in user
// will look like http://localhost:3001/api/users/loginUser
router.post('/loginUser', async (req, res) => {
    try {
        const loginMessage = {
            "message": "congrats, you've logged in!"
          }
        
            res.status(200).json(loginMessage);
    }catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
});




  module.exports = router;
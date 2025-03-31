const router = require('express').Router();
// const { User, Reservation } = require('../../models');

//create new reservation
// will look like http://localhost:3001/api/reservations/newRes
router.post('/newRes', async (req, res) => {
    try {
        const resMessage = {
            "message": "congrats, you've created a new reservation!"
          }
            res.status(200).json(resMessage);
    }catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
});

// get one reservation
// will look like http://localhost:3001/api/reservations/getOneRes/52
router.get('/getOneRes/:resId', async (req, res) => {
  try {
      const resMessage = {
          "message": "congrats, you've retrieved a reservation!",
          "reservationId": req.params.resId
        }
          res.status(200).json(resMessage);
  }catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

// get all reservations for userId
// will look like http://localhost:3001/api/reservations/getAllResForUser/75
router.get('/getAllResForUser/:userId', async (req, res) => {
  try {
      const resMessage = {
          "message": "congrats, you've retrieved all reservations!",
          "userId": req.params.userId
        }
          res.status(200).json(resMessage);
  }catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

module.exports = router;
const router = require('express').Router();
const { User, Reservation, Room } = require('../../models');

//create new reservation
// will look like http://localhost:3001/api/reservations/newRes
router.post('/newRes', async (req, res) => {
  try {

    // this bit checks to make sure there is a request body, if not, it gets mad
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    // this bit checks to make sure the frontend has sent the data required to create a new reservation
    const { userId, roomId, guestCount, checkInDate, checkOutDate } = req.body;
    if (!userId || !roomId || !guestCount || !checkInDate || !checkOutDate) {
      return res.status(400).json({ error: 'missing required fields. To create a new reservation, please provide the userId, roomId, guestCount, checkInDate, and checkOutDate. The reservation status is not needed as the default status for a new reservation is pending' });
    }

    // return a stub response so the frontend developers can verify they're successfully passing data to the backend
    const stubResponse = {
      message: 'received POST data for newRes endpoint. This endpoint is a stub. It does not yet interact with database.',
      data: req.body
    }

    res.status(200).json(stubResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get one reservation
// will look like http://localhost:3001/api/reservations/getOneRes/52
router.get('/getOneRes/:resId', async (req, res) => {

  try {

    const resData = await Reservation.findOne({
      where: { id: req.params.resId },
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Room,
          attributes: ['type', 'price_per_night']
        }
      ] });

    res.status(200).json({reservation: resData});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get all reservations for userId
// will look like http://localhost:3001/api/reservations/getAllResForUser/75
router.get('/getAllResForUser/:userId', async (req, res) => {
  
  try {

    const userResData = await Reservation.findAll({
      where: { user_id: req.params.userId },
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Room,
          attributes: ['type', 'price_per_night']
        }
      ] });

    res.status(200).json({user_reservation_data: userResData});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Room } = require('../../models');

// The front end may need this route to get room data
// so they can pair user selection of room with official room ids during reservation creation


// get all room data
// will look like http://localhost:3001/api/rooms/getAllRooms
router.get('/getAllRooms', async (req, res) => {

    try {
  
      const roomData = await Room.findAll();
  
      res.status(200).json({rooms: roomData});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
  });

module.exports = router;

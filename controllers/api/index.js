// routes in the API category
// similar to how server looks at coltrollers/index.js to get collection of all routes
// the controllers folder looks in the api/index.js to get collection of api routes

const router = require("express").Router();
const userRoutes = require('./userRoutes');
const reservationRoutes = require('./reservationRoutes');
const roomRoutes = require('./roomRoutes');

// will look like http://localhost:3001/api/users
router.use('/users', userRoutes);

// will look like http://localhost:3001/api/reservations
router.use('/reservations', reservationRoutes);

// will look like http://localhost:3001/api/rooms
router.use('/rooms', roomRoutes);

module.exports = router;
const router = require("express").Router();
const path = require('path');

// homepage (dashboard)
// Home Page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// About Page
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/About.html'));
});

// // Contact Page
// router.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/contact.html'));
// });

// // Attractions Page
// router.get('/attractions', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/attractions.html'));
// });

// // Registration Page
// router.get('/registration, (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/registration.html'));
// });

// // Login Page
// router.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/login.html'));
// });

// // Reservation Page
// router.get('/reservation', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/reservation.html'));
// });

// // Reservation Lookup Page
// router.get('/reservationlookup', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/reservationlookup.html'));
// });

module.exports = router;

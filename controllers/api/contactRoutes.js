
// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { 
    submitContactForm, 
    validateContactForm 
} = require('../controllers/contactRoutes');

router.post('/', validateContactForm, submitContactForm);

module.exports = router;

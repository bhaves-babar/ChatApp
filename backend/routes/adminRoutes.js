// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { checkAdminKey, getAllUsers,getAllReports } = require('../controllers/adminControllers');

// Route to check if a given admin key is valid
router.post('/', checkAdminKey);

// Route to get all users
router.get('/users', getAllUsers);
router.get('/report',getAllReports);

module.exports = router;

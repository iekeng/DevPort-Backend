const express = require('express');
const router =  express.Router();
const educationController = require('../controllers/educationController');

router.post('/:userId', educationController.createEducation);

router.get('/:userId/:educationId', educationController.getEducationById);

router.get('/:userId', educationController.getAllEducation);

module.exports = router;
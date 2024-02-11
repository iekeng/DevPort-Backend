const express = require('express');
const router =  express.Router();
const experienceController = require('../controllers/experienceController');

router.post('/:userId', experienceController.createExperience);

router.get('/:userId/:experienceId', experienceController.getExperienceById);

router.get('/:userId', experienceController.getAllExperience);

module.exports = router;
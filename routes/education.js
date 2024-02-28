const express = require('express');
const router =  express.Router();
const educationController = require('../controllers/educationController');

router.post('/:userId', educationController.createEducation);
router.get('/:userId/:educationId', educationController.getEducationById);
router.put('/:userId/:educationId', educationController.updateEducation);
router.get('/:userId', educationController.getAllEducation);
router.delete('/:educationId', educationController.deleteEducation);

module.exports = router;
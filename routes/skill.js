const express = require('express');
const router =  express.Router();
const skillController = require('../controllers/skillController');

router.post('/:userId', skillController.createSkill);

// router.get('/:userId/:skillId', skillController.getSkillById);

router.get('/:userId', skillController.getAllSkill);

module.exports = router;
const express = require('express');
const router =  express.Router();
const projectController = require('../controllers/projectController');

router.post('/:userId', projectController.createProject);

router.get('/:userId/:projectId', projectController.getProjectById);

router.get('/:userId', projectController.getAllProject);

module.exports = router;
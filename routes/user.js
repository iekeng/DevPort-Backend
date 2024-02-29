const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.get('/', userController.getUserByEmail);
router.get('/all', userController.getAllUsers);
router.get('/:userId', userController.getUserById);

module.exports = router;
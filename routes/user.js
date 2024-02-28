const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser)
router.put('/:userId', userController.updateUser)
router.get('/', userController.getAllUsers)
router.get('/:userId', userController.getUserById)
router.get('/', userController.getUserByEmail)

module.exports = router;
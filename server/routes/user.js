const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Root or main routes
router.get('/', userController.view);
router.post('/', userController.find);

// Add user
router.get('/adduser', userController.addUser);
router.post('/adduser', userController.createUser);

// Edit user
router.get('/edituser/:id', userController.editUser);
router.post('/edituser/:id', userController.updateUser);

// Delete user (move this after specific routes like /adduser and /edituser/:id)
router.get('/:id', userController.delete);
//view user
router.get('/viewuser/:id', userController.viewall);

module.exports = router;




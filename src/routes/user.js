const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.readUsers);
router.get('/:userId', userController.readUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;

const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', isAuth, userController.readUsers);
router.get('/me', isAuth, userController.readProfile);
router.get('/:userId', userController.readUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;

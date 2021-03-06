const express = require('express');
const userController = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', isAuth, userController.readUsers);
router.get('/me', isAuth, userController.readProfile);
router.post('/me/avatar', isAuth, userController.uploadAvatar);
router.delete('/me/avatar', isAuth, userController.deleteAvatar);
router.get('/:userId', isAuth, userController.readUser);
router.patch('/me', isAuth, userController.updateProfile);
router.patch('/:userId', isAuth, userController.updateUser);
router.delete('/me', isAuth, userController.deleteProfile);
router.delete('/:userId', isAuth, userController.deleteUser);
router.get('/:userId/avatar', userController.getUserAvatarById);

module.exports = router;

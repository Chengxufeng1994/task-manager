const express = require('express');
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();
router.post('/login', authController.login);
router.post('/logout', isAuth, authController.logout);
router.post('/logoutAll', isAuth, authController.logoutAll);

module.exports = router;

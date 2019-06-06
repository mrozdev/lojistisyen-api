const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { userSignupValidator } = require('../validator');

const router = express.Router();

router.post('/kaydol', userSignupValidator, signup);
router.post('/giris', signin);
router.get('/cikis', signout);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
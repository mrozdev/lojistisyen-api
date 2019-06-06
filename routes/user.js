const express = require('express');
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/uyeler', allUsers);
router.get('/uye/:userId', requireSignin, getUser);
router.put('/uye/:userId', requireSignin, updateUser);
router.delete('/uye/:userId', requireSignin, deleteUser);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
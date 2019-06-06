const express = require('express');
const {getWalls, createWall, wallsByUser, wallById, isPosters, updateWall, deleteWall} = require('../controllers/wall');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {createWallValidator} = require('../validator');

const router = express.Router();

router.get('/durumlar', getWalls);
router.post('/durum/yeni/:userId', requireSignin, createWall, createWallValidator);
router.get("/durumlar/yazar/:userId", requireSignin, wallsByUser);
router.put("/durum/:wallId", requireSignin, isPosters, updateWall);
router.delete("/durum/:wallId", requireSignin, isPosters, deleteWall);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

// any route containing :wallId, our app will first execute wallByID()
router.param("wallId", wallById);

module.exports = router;
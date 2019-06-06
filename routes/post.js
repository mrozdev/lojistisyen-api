const express = require('express');
const {getPosts, createPost, postsByUser, postById, isPoster, updatePost, deletePost} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {createPostValidator} = require('../validator');

const router = express.Router();

router.get('/haberler', getPosts);
router.post('/haber/yeni/:userId', requireSignin, createPost, createPostValidator);
router.get("/haberler/yazar/:userId", requireSignin, postsByUser);
router.put("/haber/:postId", requireSignin, isPoster, updatePost);
router.delete("/haber/:postId", requireSignin, isPoster, deletePost);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

// any route containing :postId, our app will first execute postByID()
router.param("postId", postById);

module.exports = router;
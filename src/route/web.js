const express = require('express');
const cookieParser = require('cookie-parser');
const { getHomePage, getSignUpForm, getLoginForm, getListCategory, getCartForm, getDetailBook, auth, postLogin, logout } = require('../controller/HomeController');
const { checkValid } = require('../middleware/valid.middleware');
const router = express.Router();

router.use(cookieParser());

router.get('/', getHomePage);
router.get('/signup', getSignUpForm);
router.get('/login', getLoginForm);
router.get('/category', getListCategory);
router.get('/cart', getCartForm);
router.get('/details/book', getDetailBook);
router.post('/login', checkValid, postLogin);

router.get('/logout', logout);

module.exports = router;
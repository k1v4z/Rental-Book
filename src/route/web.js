const express = require('express');
const { getHomePage, getSignUpForm, getLoginForm, getListCategory } = require('../controller/HomeController');
const router = express.Router();

router.get('/', getHomePage);
router.get('/signup', getSignUpForm);
router.get('/login', getLoginForm);
router.get('/category', getListCategory);

module.exports = router;
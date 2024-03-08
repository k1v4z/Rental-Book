const express = require('express');
const cookieParser = require('cookie-parser');
const { getHomePage, getSignUpForm, getLoginForm, getListCategory,
    getCartForm, getDetailBook, postLogin, logout, } = require('../controller/HomeController');
const { checkValid } = require('../middleware/valid.middleware');
const { checkCookie } = require('../middleware/cookie.middleware');
const checkCPAmiddleware = require('../middleware/cap.middleware');
const { personal, getFormAddBook, getInventory, getSettingForm, getListBookRented, addNewBook } = require('../controller/PersonalController');
const router = express.Router();
const { upload } = require('../config/multer');

router.use(cookieParser());

router.get('/', getHomePage);
router.get('/signup', getSignUpForm);
router.get('/login', getLoginForm);
router.get('/category', getListCategory);
router.get('/cart', checkCookie, getCartForm);
router.get('/details/book', getDetailBook);

router.post('/login', checkValid, postLogin);
router.get('/logout', checkCookie, logout);

router.get('/personal', checkCookie, personal);
router.get('/addbook', [checkCPAmiddleware.checkcookie,
checkCPAmiddleware.checkpermission], getFormAddBook);
router.get('/inventory', [checkCPAmiddleware.checkcookie,
checkCPAmiddleware.checkpermission], getInventory);
router.get('/setting', checkCookie, getSettingForm);
router.get('/listbook/:id', checkCookie, getListBookRented);
router.post('/addnewbook', [checkCPAmiddleware.checkcookie,
checkCPAmiddleware.checkpermission, upload.single('book-pic')], addNewBook);

module.exports = router;
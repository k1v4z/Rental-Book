const { authen } = require("../service/authentication.service");

const getHomePage = (req, res) => {
    let userData = req.cookies.userData;

    if (userData === undefined) {
        userData = JSON.stringify({});
    }

    res.render('HomePage.ejs', { userData: JSON.parse(userData) });
}

const postLogin = async (req, res) => {
    const { username, passwords } = req.body;

    const user = await authen(username, passwords);

    if (user.username === undefined) {
        res.send('Username or passsword is incorrect');
    } else {
        res.cookie('userData', JSON.stringify(user), {
            maxAge: 5 * 60 * 1000, //cookie expired
            httpOnly: true,
            secure: false,
            sameSites: 'strict'
        });

        res.redirect('/');
    }
}

const logout = (req, res) => {
    res.clearCookie('userData');

    res.redirect('/');
}

const getSignUpForm = (req, res) => {
    const userData = req.cookies.userData;

    if (userData) {
        res.send('You are already logged in');
    }

    return res.render('SignUp.ejs');
}

const getLoginForm = (req, res) => {
    const userData = req.cookies.userData;

    if (userData) {
        res.send('You are already logged in');
    }

    return res.render('Login.ejs');
}

const getListCategory = (req, res) => {
    let userData = req.cookies.userData;

    if (userData === undefined) {
        userData = JSON.stringify({});
    }

    return res.render('ListCategory.ejs', { userData: JSON.parse(userData) });
}

const getCartForm = (req, res) => {
    let userData = req.cookies.userData;

    if (userData === undefined) {
        userData = JSON.stringify({});
    }

    return res.render('cart.ejs', { userData: JSON.parse(userData) });
}

const getDetailBook = (req, res) => {
    return res.render('detail.ejs');
}

module.exports = {
    getHomePage, getSignUpForm, getLoginForm,
    getListCategory, getCartForm, getDetailBook,
    postLogin, logout
}
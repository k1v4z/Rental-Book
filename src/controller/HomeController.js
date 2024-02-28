const getHomePage = (req, res) => {
    return res.render('HomePage.ejs');
}

const getSignUpForm = (req, res) => {
    return res.render('SignUp.ejs');
}

const getLoginForm = (req, res) => {
    return res.render('Login.ejs');
}

const getListCategory = (req, res) => {
    return res.render('ListCategory.ejs');
}

module.exports = {
    getHomePage, getSignUpForm, getLoginForm, getListCategory
}
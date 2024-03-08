const checkCookie = (req, res, next) => {
    let userData = req.cookies.userData;

    if (userData === undefined) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = {
    checkCookie
}
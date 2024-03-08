const checkValid = (req, res, next) => {
    const { username, passwords } = req.body;

    console.log(username);

    //check username, password is valid
    if (username.length < 6) {
        return res.status(409).json({
            status: 409,
            message: 'username must have more than 6 characters'
        });
    }

    if (passwords.length < 6) {
        return res.status(409).json({
            status: 409,
            message: 'password must have more than 6 characters'
        });
    }
    next();
}

module.exports = {
    checkValid
}
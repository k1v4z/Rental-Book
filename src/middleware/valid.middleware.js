const checkValid = (req, res, next) => {
    const { username, passwords } = req.body;

    console.log(username);

    //check username, password is valid
    if (username.length < 6) {
        return res.status(400).json({
            status: 400,
            message: 'username must have more than 6 characters'
        });
    }

    if (passwords.length < 6) {
        return res.status(400).json({
            status: 400,
            message: 'password must have more than 6 characters'
        });
    }
    next();
}

const checktypeOfQueryId = (req, res, next) => {
    const bookId = req.query.id;
    //check id book
    //If id book is a letter send a message else go to controller
    if (bookId.match(/[a-z]/i)) {
        return res.status(400).json({
            message: 'bookId is not valid'
        })
    }
    next();
}

module.exports = {
    checkValid, checktypeOfQueryId
}
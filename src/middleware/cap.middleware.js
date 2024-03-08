const checkCPAmiddleware = {
    // name function stand for check cookie and permission middleware
    // this middleware use for some feature must have permission to access
    // check cookie help you know who is accessing to system
    // when user access succesful, user can use some feature which have enough permission

    checkcookie: (req, res, next) => {
        let userData = req.cookies.userData;

        if (userData === undefined) {
            res.redirect('/login');
        } else {
            next();
        }
    },
    checkpermission: (req, res, next) => {
        const role = JSON.parse(req.cookies.userData);

        if (role.roles === 'user') {
            res.send(`You don't have permission to use this feature`);
        } else {
            next();
        }
    }
}

module.exports = checkCPAmiddleware;
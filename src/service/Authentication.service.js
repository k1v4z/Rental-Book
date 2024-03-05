const User = require("../model/User")


//check user have exist
const authen = async (username, password) => {
    const user = await User.findOne({
        where: {
            username: username,
            passwords: password
        }
    });

    return user === null ? {} : user;
}

module.exports = {
    authen
}
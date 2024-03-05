const { signUp, login, getIdUser } = require("../service/CRUD.Service");

const apisignup = async (req, res) => {
    const { status, message } = await signUp(req);

    return res.status(status).json({
        status: status,
        message: message
    });
}

const apilogin = async (req, res) => {
    const { status, message } = await login(req);

    return res.status(status).json({
        status: status,
        message: message
    });
}

const apigetIdUser = async (req, res) => {
    const { id } = await getIdUser(req);


    return res.status(200).json({
        id: id,
    })
}

module.exports = {
    apisignup, apilogin, apigetIdUser
}
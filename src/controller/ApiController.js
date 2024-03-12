const { signUp, login, getIdUser, increaseQuantityBook,
    decreaseQuantityBook, deleteBook } = require("../service/CRUD.Service");

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

const apiCheckPermission = (req, res) => {
    const role = req.params.role;

    return res.status(200).json({
        role: role
    })
}

const apiIncreaseQuantity = async (req, res) => {
    const bookId = req.query.id;

    const bookExist = await increaseQuantityBook(bookId);

    if (bookExist) {
        return res.status(200).json({
            message: 'increase quantity of book successful'
        })
    }

    return res.status(400).json({
        message: `This book not existed`
    })
}

const apiDecreaseQuantity = async (req, res) => {
    const bookId = req.query.id;

    const status = await decreaseQuantityBook(bookId);

    if (status.check) {
        return res.status(200).json({
            message: status.message
        })
    }

    return res.status(400).json({
        message: status.message
    })
}

const apiDeleteBook = async (req, res) => {
    const bookId = req.query.id;

    const deleteB = await deleteBook(bookId); //deleteB = deleteBook, it's duplicate
    if (deleteB) {
        return res.status(200).json({
            message: 'Delete Successful'
        });
    }

    return res.status(400).json({
        message: 'Book not exist'
    })
}

module.exports = {
    apisignup, apilogin, apigetIdUser, apiCheckPermission,
    apiIncreaseQuantity, apiDecreaseQuantity, apiDeleteBook
}
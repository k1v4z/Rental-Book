const { signUp, login, getIdUser, increaseQuantityBook,
    decreaseQuantityBook, deleteBook } = require("../service/CRUD.Service");
const { sendPaymentRequest, acceptPaymentRequest, rejectPaymentRequest } = require("../service/PaymenRequest.service");
const { recharge } = require("../service/Payment.service");
const { returnBook } = require("../service/Return.service");

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

const apiReturnBook = async (req, res) => {
    const { rentid, bookid } = req.query;
    await returnBook(rentid, bookid);

    return res.status(200).json({
        message: 'Book have been returned'
    })
}

const apiSendPaymentRequest = async (req, res) => {
    const { amount } = req.query;
    const userid = await getIdUser(req);
    const request = await sendPaymentRequest(amount, userid.id);
    if (request) {
        return res.status(200).json({
            message: "Request successful"
        });
    }

    return res.status(400).json({
        error: "Bad request"
    })
}

const apiAcceptPaymentRequest = async (req, res) => {
    const { id } = req.query;
    const accept = await acceptPaymentRequest(id);
    if (accept) {
        return res.status(200).json({
            message: "Successful"
        });
    }

    return res.status(400).json({
        error: "Bad request"
    });
}

const apiRejectRequest = async (req, res) => {
    const { id } = req.query;
    const reject = await rejectPaymentRequest(id);
    
    if (reject) {
        return res.status(200).json({
            message: "Successful"
        });
    }

    return res.status(400).json({
        error: "Bad request"
    });
}

const apiRecharge = async (req, res) => {
    const { id, amount } = req.query;
    const rechargeSuccess = await recharge(id, amount);

    if (rechargeSuccess) {
        return res.status(200).json({
            message: "Recharge successful"
        })
    }

    return res.status(400).json({
        error: 'Bad request'
    })
}

module.exports = {
    apisignup, apilogin, apigetIdUser, apiCheckPermission,
    apiIncreaseQuantity, apiDecreaseQuantity, apiDeleteBook,
    apiReturnBook, apiSendPaymentRequest, apiAcceptPaymentRequest,
    apiRecharge, apiRejectRequest
}
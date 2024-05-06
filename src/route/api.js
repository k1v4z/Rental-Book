const express = require('express');
const { apisignup, apilogin, apigetIdUser, apiCheckPermission,
    apiIncreaseQuantity, apiDecreaseQuantity, apiDeleteBook,
    apiReturnBook, apiSendPaymentRequest, apiAcceptPaymentRequest, apiRecharge, apiRejectRequest } = require('../controller/ApiController');

const { checkValid, checktypeOfQueryId } = require('../middleware/valid.middleware');
const checkCPAmiddleware = require('../middleware/cap.middleware');

let router = express.Router();

const initApiRoute = (app) => {
    router.post('/signup', checkValid, apisignup);
    router.post('/login', checkValid, apilogin);

    router.get('/getiduser', apigetIdUser);
    router.get('/checkpermission/:role', apiCheckPermission);

    router.patch('/increase-amount', checktypeOfQueryId, apiIncreaseQuantity);
    router.patch('/decrease-amount', checktypeOfQueryId, apiDecreaseQuantity);
    router.patch('/delete-book', checktypeOfQueryId, apiDeleteBook);

    router.patch('/return-book', apiReturnBook);
    router.post('/send-payment-request', apiSendPaymentRequest);
    router.patch('/accept-request', apiAcceptPaymentRequest);
    router.patch('/reject-request', apiRejectRequest);
    router.patch('/recharge', apiRecharge);

    return app.use('/api/v1/', router);
}

module.exports = {
    initApiRoute
}
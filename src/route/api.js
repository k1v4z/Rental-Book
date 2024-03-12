const express = require('express');
const { apisignup, apilogin, apigetIdUser, apiCheckPermission, apiIncreaseQuantity, apiDecreaseQuantity, apiDeleteBook } = require('../controller/ApiController');

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
    router.patch('/delete-book',checktypeOfQueryId, apiDeleteBook);

    return app.use('/api/v1/', router);
}

module.exports = {
    initApiRoute
}
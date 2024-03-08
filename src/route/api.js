const express = require('express');
const { apisignup, apilogin, apigetIdUser, apiCheckPermission } = require('../controller/ApiController');

const { checkValid } = require('../middleware/valid.middleware');

let router = express.Router();

const initApiRoute = (app) => {
    router.post('/signup', checkValid, apisignup);
    router.post('/login', checkValid, apilogin);

    router.get('/getiduser', apigetIdUser);
    router.get('/checkpermission/:role', apiCheckPermission);

    return app.use('/api/v1/', router);
}

module.exports = {
    initApiRoute
}
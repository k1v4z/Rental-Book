require('dotenv').config();

const express = require('express');
const router = require('./route/web');
const setViewEngine = require('./config/ViewEngine');
const app = express()
const port = process.env.PORT;
const localhost = process.env.HOST;

setViewEngine(app);

app.use(router);
app.listen(port, localhost, () => {
    console.log(`http://${localhost}:${port}`);
})
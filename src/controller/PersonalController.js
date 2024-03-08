const { addBook } = require("../service/CRUD.Service");

const personal = (req, res) => {
    res.render('personal.ejs', { userData: getUserData(req) });
}

const getInventory = (req, res) => {
    return res.render('inventory.ejs', { userData: getUserData(req) });
}

const getFormAddBook = (req, res) => {

    return res.render('addbook.ejs', { userData: getUserData(req) });
}

const getSettingForm = (req, res) => {
    return res.render('setting.ejs', { userData: getUserData(req) });
}

const getListBookRented = (req, res) => {
    return res.render('listbookrented.ejs', { userData: getUserData(req) });
}

const getUserData = (req) => {
    let userData = req.cookies.userData;

    if (userData === undefined) {
        userData = JSON.stringify({});
    }

    return JSON.parse(userData);
}

const addNewBook = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    addBook();
    res.send('hello');
}

module.exports = {
    personal, getInventory, getFormAddBook, getSettingForm,
    getListBookRented, addNewBook
}
const { addBook, getBookInventory, getBookInfor, updateBookInformation, getListCategory, addCategory, getUserRentBook, getRentById, getAmount } = require("../service/CRUD.Service");
const { getPaymentRequest } = require("../service/PaymenRequest.service");

const personal = (req, res) => {

    res.render('personal.ejs', { userData: getUserData(req) });
}

const getInventory = async (req, res) => {
    const bookInventory = await getBookInventory();

    return res.render('inventory.ejs', {
        userData: getUserData(req),
        book: bookInventory
    });
}

const getFormAddBook = (req, res) => {

    return res.render('addbook.ejs', { userData: getUserData(req) });
}

const getSettingForm = async (req, res) => {
    const username = req.params.username;
    const amount = await getAmount(username);
    return res.render('setting.ejs', {
        userData: getUserData(req),
        amount: amount
    });
}

const getEditForm = async (req, res) => {
    const bookId = req.params.id;
    const infor = await getBookInfor(bookId);

    return res.render('edit.ejs', {
        userData: getUserData(req),
        information: infor
    });
}

const category = async (req, res) => {
    const categories = await getListCategory();

    return res.render('managecategory.ejs', {
        userData: getUserData(req),
        listcategory: categories
    });
}

const getListBookRented = async (req, res) => {
    const listUser = await getUserRentBook();

    return res.render('listbookrented.ejs', {
        userData: getUserData(req),
        userRentArr: listUser
    });
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

    if (await addBook(req)) {
        res.send('Add book succesful');
    } else {
        //category don't exist but system still upload image into folder product. This statements will delete this image
        var fs = require('fs');
        var filepath = `D:/RentalBook/src/public/product/${req.file.filename}`;
        //if you save image product in other location, please change filepath

        fs.unlink(filepath, (err) => {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });

        res.send(`Category don't exist`);
    }
}

//this function show which book is user rent?
const getRent = async (req, res) => {
    const id = req.params.id;
    const rent = await getRentById(id);

    return res.render('rent.ejs', {
        userData: getUserData(req),
        userRentObject: rent
    });
}

const addNewCategory = async (req, res) => {
    const { categoryName } = req.body;

    const message = await addCategory(categoryName);
    res.send(message);
}

const updateBook = async (req, res) => {
    let haveimage = false; //default true

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (req.file) {
        haveimage = true; //user edit book's information have uploaded image
    }

    await updateBookInformation(req, haveimage);

    res.redirect('/inventory');
}

const paymentRequest = async (req, res) => {
    const paymentRequest = await getPaymentRequest();
    return res.render('payment-request.ejs', {
        userData: getUserData(req),
        paymentRequest: paymentRequest
    });
}

module.exports = {
    personal, getInventory, getFormAddBook, getSettingForm,
    getListBookRented, addNewBook, getEditForm, updateBook,
    category, addNewCategory, getRent, paymentRequest,
}
const { addBook, getBookInventory, getBookInfor, updateBookInformation, getListCategory, addCategory, getUserRentBook, getRentById } = require("../service/CRUD.Service");

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

const getSettingForm = (req, res) => {
    return res.render('setting.ejs', { userData: getUserData(req) });
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
    addBook(req);

    res.send('Add book succesful');
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

module.exports = {
    personal, getInventory, getFormAddBook, getSettingForm,
    getListBookRented, addNewBook, getEditForm, updateBook,
    category, addNewCategory, getRent
}
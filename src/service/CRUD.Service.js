const User = require('../model/User');
const Book = require('../model/Book');
const Category = require('../model/Category');
const BookRented = require('../model/BookRented');
const Rental = require('../model/Rental');

const { handlePayment } = require('./Calculate.service');
const { checkCategoryExist } = require('../helper/checkexist.helper');

const checkUserExist = async (username) => {

    const user = await User.findOne({
        where: {
            username: username
        }
    });

    return user === null ? true : false;
}

const getBookById = async (id) => {
    const book = await Book.findOne({
        where: {
            bookId: Number(id)
        }
    });

    if (!book) {
        return false; //falsy value
    }

    return book.dataValues; //truthy value
}

const getQuantityById = async (id) => {
    const quantity = await Book.findOne({
        attributes: ['quantity'],
        where: {
            bookId: Number(id)
        }
    });

    return quantity === null ? null : quantity.dataValues.quantity;
}

const increaseQuantityBook = async (id) => {

    if (await getBookById(id)) {
        await Book.increment('quantity', {
            where: {
                bookId: Number(id)
            }
        });

        return true; //book is existed
    }

    return false; //book is not exist
}

const decreaseQuantityBook = async (id) => {

    const quantity = await getQuantityById(id);

    if (quantity === null) {
        return {
            check: false, //use this to handle if statement in controller
            message: 'book is not exist'
        }; //book is not exist
    } else if (quantity === 0) {
        return {
            check: false,
            message: 'Quantity equals 0 so you can not to delete anymore'
        } // when book quantity = 0 can't delete anymore
    } else {
        await Book.decrement('quantity', {
            where: {
                bookId: Number(id)
            }
        });

        return {
            check: true,
            message: 'decrease quantity successful'
        };
    }

}

const deleteBook = async (id) => {
    if (await getBookById(id)) {
        await Book.update({ isdeleted: true }, {
            where: {
                bookId: id
            },
        });

        return true;
    }

    return false;
}

const signUp = async (req) => {
    const { username, passwords, roles } = req.query;

    if (await checkUserExist(username) === true) {
        await User.create({
            username: username,
            passwords: passwords,
            roles: roles
        });
        return {
            status: 200,
            message: 'Sign Up Successful'
        };
    } else {
        return {
            status: 409,
            message: 'User existed'
        };
    }
}

const login = async (req) => {
    const { username, passwords } = req.query;

    const user = await User.findOne({
        where: {
            username: username,
            passwords: passwords
        }
    })

    return user === null ? {
        status: 409,
        message: 'User name or password is incorrect'
    } : {
        status: 200,
        message: 'Login Successful'
    };
}

const getIdUser = async (req) => {
    const { username } = req.query;

    const user = await User.findOne({
        where: {
            username: username
        }
    });

    return {
        id: user.dataValues.id
    };
}

const addBook = async (req) => {
    const { bookName, author, description, priceRent, quantity, category } = req.body;

    const image = req.file.filename;
    const categoryIsExist = await checkCategoryExist(category);
    if (categoryIsExist) {
        await Book.create({
            name: bookName,
            author: author,
            description: description,
            price: priceRent,
            image: image,
            idcategory: category,
            isdeleted: false,
            quantity: quantity
        });

        return true;
    }

    return false;
}

const updateBookInformation = async (req, haveimage) => {
    const { bookId, bookName, author, description, priceRent, quantity, category } = req.body;

    let image = (await getBookById(bookId)).image;

    if (haveimage) {
        var fs = require('fs');
        var filepath = `D:/RentalBook/src/public/product/${image}`; //delete previous file
        //if you save image product in other location, please change filepath
        fs.unlink(filepath, (err) => {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });

        image = req.file.filename; //update new file
    }

    await Book.update({
        name: bookName,
        author: author,
        description: description,
        price: priceRent,
        image: image,
        quantity: quantity,
        category: category
    }, {
        where: {
            bookId: Number(bookId)
        }
    });

}

const getBookInventory = async () => {
    //Get all book in database
    const bookInventory = await Book.findAll({
        where: {
            isdeleted: false
        }
    });

    return bookInventory;
}

const getBookInfor = async (id) => {
    const book = await getBookById(id);

    return book;
}

const getListCategory = async () => {
    const categories = await Category.findAll();
    return categories;
}

const getUserRentBook = async () => {
    const user = await User.findAll({
        attributes: ['username', 'id'],
        where: { roles: 'user' },
        include: [
            {
                model: Rental,
                attributes: ['rentid'],
                include: [
                    {
                        model: BookRented,
                        attributes: ['rentid'],
                        where: { isreturn: false },
                        include: [{
                            model: Book,
                            attributes: ['name']
                        }]
                    }
                ]
            }
        ]
    });

    return JSON.parse(JSON.stringify(user));
}


const getDetail = async (id) => {
    const book = await Book.findOne({
        where: {
            bookId: Number(id)
        }
    });

    return book.dataValues;
}

const getRentById = async (userid) => {
    const rent = await User.findOne({
        attributes: ['username', 'id'],
        where: { id: userid },
        include: [
            {
                model: Rental,
                attributes: ['rentid', 'payment'],
                include: [
                    {
                        model: BookRented,
                        attributes: ['rentid', 'rentdate', 'returndate', 'isreturn'],
                        include: [{
                            model: Book,
                            attributes: ['bookid', 'name', 'author', 'image', 'price']
                        }]
                    }
                ]
            }
        ]
    });

    const rentJSON = JSON.parse(JSON.stringify(rent));
    //console.table(JSON.stringify(rentJSON));
    return await handlePayment(rentJSON);
}

const getAmount = async (username) => {
    const amount = await User.findOne({
        where: {
            username: username
        }
    })
        .then(response => JSON.stringify(response))
        .then((respondJSON) => {
            const am = JSON.parse(respondJSON); //am is amount, avoid duplicate variable
            return am.amount;
        })
        .catch(error => console.log(error));

    return amount;
}

const addCategory = async (name) => {
    let message = '';
    await Category.findOrCreate({
        where: {
            name: name.trim() //check name have exist in database
        },
        defaults: { // set the default properties if it doesn't exist
            name: name.trim()
        }
    }).then(function (result) {
        var created = result[1]; // boolean stating if it was created or not

        if (!created) { // false if this category already exists and was not created.
            message = 'This category already exists';
        } else {
            message = 'Add succesful';
        }
    }).catch(function (err) {
        console.log(err); //catch error avoid crash app
    });

    return message;
}

module.exports = {
    signUp, login, getIdUser, addBook, getBookInventory,
    increaseQuantityBook, decreaseQuantityBook, deleteBook,
    getBookInfor, updateBookInformation, getListCategory, addCategory,
    getDetail, getUserRentBook, getRentById, getAmount
}
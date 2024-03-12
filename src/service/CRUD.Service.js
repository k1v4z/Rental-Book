const User = require('../model/User');
const Book = require('../model/Book')

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

    const book = await Book.create({
        name: bookName,
        author: author,
        description: description,
        price: priceRent,
        image: image,
        idcategory: category,
        isdeleted: false,
        quantity: quantity
    });

}

const updateBookInformation = async (req, haveimage) => {
    const { bookId, bookName, author, description, priceRent, quantity, category } = req.body;

    let image = (await getBookById(bookId)).image;

    if (haveimage) {
        var fs = require('fs');
        var filepath = `D:/RentalBook/src/public/product/${image}`; //delete previous file

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

module.exports = {
    signUp, login, getIdUser, addBook, getBookInventory,
    increaseQuantityBook, decreaseQuantityBook, deleteBook,
    getBookInfor, updateBookInformation
}
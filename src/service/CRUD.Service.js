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

const addBook = async () => {
    const book = await Book.create({
        name: '',
        author: '',
        description: '',
        price: 122222,
        image: '',
        idcategory: 1,
        isdeleted: false,
        quantity: 1
    });

    console.log(book);
}

module.exports = {
    signUp, login, getIdUser, addBook
}
const { sequelize } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

//define entity
const Book = sequelize.define('Books', {
    bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    idcategory: DataTypes.INTEGER,
    isdeleted: DataTypes.BOOLEAN,
    quantity: DataTypes.INTEGER,
});

module.exports = Book;

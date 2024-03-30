const { sequelize } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');
const Rental = require('./Rental');
const User = require('./User');
const Book = require('./Book');

//define entity
const BookRented = sequelize.define('BookRenteds', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    rentid: DataTypes.INTEGER,
    bookid: DataTypes.INTEGER,
    rentdate: DataTypes.DATE,
    returndate: DataTypes.DATE,
    isreturn: DataTypes.BOOLEAN,
    delay: DataTypes.INTEGER
});

//define association
User.hasMany(Rental, { foreignKey: 'userid' });
Rental.belongsTo(User, { foreignKey: 'userid' });

Rental.hasMany(BookRented, { foreignKey: 'rentid' });
BookRented.belongsTo(Rental, { foreignKey: 'rentid' });

Book.hasMany(BookRented, { foreignKey: 'bookId' });
BookRented.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = BookRented;

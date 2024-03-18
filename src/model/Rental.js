const { sequelize } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');
const User = require('./User');

//define entity
const Rental = sequelize.define('Rentals', {
    rentid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    payment: DataTypes.INTEGER
});

module.exports = Rental;

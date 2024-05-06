const { sequelize } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

//define entity
const User = sequelize.define('Users', {
    username: DataTypes.STRING,
    passwords: DataTypes.STRING,
    roles: DataTypes.STRING,
    amount: DataTypes.INTEGER
});

module.exports = User;

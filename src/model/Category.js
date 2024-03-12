const { sequelize } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');

//define entity
const Category = sequelize.define('Categories', {
    idcategory: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: DataTypes.STRING,
});

module.exports = Category;
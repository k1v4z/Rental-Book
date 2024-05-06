const { sequelize } = require('../config/Sequelize');
const { DataTypes } = require('sequelize');
const User = require('./User');

//define entity
const PaymentRequest = sequelize.define('PaymentRequests', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userid: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN, //status of request (true is accept, false is reject, null is pending)
    requestAt: DataTypes.DATE,
});

//define association
User.hasMany(PaymentRequest, { foreignKey: 'userid' });
PaymentRequest.belongsTo(User, { foreignKey: 'userid' });

module.exports = PaymentRequest;

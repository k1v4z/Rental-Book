const { sequelize } = require("../config/Sequelize");
const PaymentRequest = require("../model/PaymentRequest")
const User = require("../model/User");
const { QueryTypes } = require('sequelize');

const recharge = async (id, amount) => {
    //raw query for simple
    const user = sequelize.query(`
        UPDATE Users
        JOIN PaymentRequests ON Users.id = PaymentRequests.userid
        SET Users.amount = Users.amount + ${amount}
        WHERE PaymentRequests.id = ${id};
    `, { type: QueryTypes.UPDATE })
        .then(response => true)
        .catch((error) => {
            console.log(error);
            return false;
        })
    return user;
}

module.exports = {
    recharge
}
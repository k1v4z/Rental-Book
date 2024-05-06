const { getTimeStamp, formatDate } = require("../helper/timestamp.helper");
const PaymentRequest = require('../model/PaymentRequest');
const User = require("../model/User");

const sendPaymentRequest = async (amount, userid) => {
    const requestAt = getTimeStamp();

    const requestPromise = await PaymentRequest.create({
        userid: userid,
        amount: amount,
        requestAt: requestAt
    }).then(response => JSON.stringify(response)) //change promise into json string
        .then((respondJSON) => {
            const requestObj = JSON.parse(respondJSON);//change json string into json object
            requestObj.requestAt = formatDate(requestObj.requestAt); //change timezone us to vietnam

            return requestObj;
        })
        .catch((error) => {
            //console.log(error);
            return false; //falsy value when happen error. This value use to check request
        })

    console.log(requestPromise);

    return requestPromise;
}

const getPaymentRequest = async () => {
    const paymentRequest = await PaymentRequest.findAll({
        attributes: ['id', 'amount', 'requestAt'],
        include: [{
            model: User,
            attributes: ['username']
        }],
        where: { state: null }
    }).then(respone => JSON.stringify(respone)) //change promise to json string
        .then((respondJSON) => {
            const paymentArr = JSON.parse(respondJSON);
            for (let element of paymentArr) {
                element.requestAt = formatDate(element.requestAt); //change timezone us to vn
            }
            return paymentArr;
        })
        .catch(error => console.log(error));

    return paymentRequest;
}

const acceptPaymentRequest = async (id) => {
    const accept = await PaymentRequest.update({
        state: true
    }, { where: { id: id } })
        .then(response => JSON.stringify(response)) //change promise to json string
        .then(respondJSON => {
            const acceptObj = JSON.parse(respondJSON);
            console.log(acceptObj);
            return acceptObj;
        })
        .catch((error) => {
            console.log(error);
            return false; //falsy value when happen error. This value use to check request
        });

    return accept;
}

const rejectPaymentRequest = async (id) => {
    const reject = await PaymentRequest.update({
        state: false
    }, { where: { id: id } })
        .then(response => JSON.stringify(response)) //change promise to json string
        .then(respondJSON => {
            const acceptObj = JSON.parse(respondJSON);
            console.log(acceptObj);
            return acceptObj;
        })
        .catch((error) => {
            console.log(error);
            return false; //falsy value when happen error. This value use to check request
        });

    return reject;
}

module.exports = {
    sendPaymentRequest, getPaymentRequest, acceptPaymentRequest,
    rejectPaymentRequest
}
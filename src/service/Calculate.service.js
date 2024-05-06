const BookRented = require("../model/BookRented");
const Rental = require("../model/Rental");

const calculateMoneyPay = (returndate, money) => {
    const now = Date.parse(new Date().toISOString().split('T')[0]); //yyyy-mm-dd
    let dayDelay = 0; //default user don't return late

    if ((now - returndate) / 86400000 >= 1) {
        dayDelay = (now - returndate) / 86400000;
    }

    //each delay 1 day user must return more 10% book's rent price 
    const moneyPay = money * (dayDelay * 10 / 100);
    return { money: moneyPay, day: dayDelay };
}

const paidRemaining = (payment, rent) => {
    let paid = payment;
    rent.BookRenteds.forEach((book) => {
        const price = book.Book.price;
        if (book.isreturn) {
            paid = paid - price - (price * book.delay * 0.1);
        }
    });

    return paid;
}

const handlePayment = async (rentJSON) => {
    let payment = 0;
    for (let rent of rentJSON.Rentals) {
        for (let book of rent.BookRenteds) {
            if (!book.isreturn) { //if book have been returned,it won't calculate payment
                const returndate = Date.parse(book.returndate);
                const moneyPay = calculateMoneyPay(returndate, book.Book.price); //calculate money must pay if delay
                book.delay = moneyPay.day; //number days user return late
                updateDayDelay(rent.rentid, book.Book.bookid, book.delay);
                payment += book.Book.price + moneyPay.money; //new payment if user return late
            } else {
                book.delay = await getDelay(rent.rentid, book.Book.bookid);
                const price = book.Book.price;
                payment = payment + price + (price * book.delay * 0.1);
            }
        };

        if (rent.payment != payment) {
            rent.payment = payment;
            updatePaymentByRentId(rent.rentid, payment);
        }

        rent.paidRemaining = paidRemaining(rent.payment, rent);
        payment = 0; //reset payment
    }

    return rentJSON;
}

const updatePaymentByRentId = async (rentid, payment) => {
    await Rental.update({
        payment: payment
    }, { where: { rentid: rentid } });
}

const getDelay = async (rentid, bookid) => { //this function use to get the number of day user return delay
    const delay = await BookRented.findOne({
        attributes: ['delay'],
        where: { rentid: rentid, bookid: bookid } //rentid in database = rentid in params
    }).then(respond => JSON.stringify(respond)) //convert to JSON string
        .then(respondJSON => JSON.parse(respondJSON).delay); //convert JSON string to JSON

    return delay;
}

const updateDayDelay = async (rentid, bookid, dayDelay) => {
    await BookRented.update({ delay: dayDelay }, {
        where: { rentid: rentid, bookid: bookid }
    });
}

module.exports = { calculateMoneyPay, paidRemaining, handlePayment }
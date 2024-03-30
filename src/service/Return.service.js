const BookRented = require("../model/BookRented")

const returnBook = async (rentid, bookid) => {
    await BookRented.update({
        isreturn: true
    }, { where: { rentid: rentid, bookid: bookid } })
}

module.exports = { returnBook }
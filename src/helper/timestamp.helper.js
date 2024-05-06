const moment = require('moment-timezone');
const formatDate = (date) => {
    //original date
    const utcDate = moment.utc(date);
    //convert to timezone VietNam
    const vnDate = utcDate.tz('Asia/Ho_Chi_Minh');
    //format 24h mode
    const format = vnDate.format('DD/MM/YYYY HH:mm:ss');

    return format;
}

// this function use to get timestamp
const getTimeStamp = () => {
    const now = new Date();
    //change timezone VietNam
    const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }; //display following 24h mode
    const timeString = now.toLocaleTimeString('en-US', options);
    const dateString = now.toLocaleDateString('en-US');
    const timestamp = `${dateString} ${timeString}`;

    return timestamp;
}

module.exports = {
    getTimeStamp, formatDate
};


